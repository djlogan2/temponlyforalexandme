import { Meteor } from "meteor/meteor";
import CommonBasicGame from "/lib/CommonBasicGame";
import {
  BasicPlayedGameRecord,
  Clock,
  GameStatus,
} from "/lib/records/GameRecord";
import { PieceColor } from "/lib/records/ChallengeRecord";
import { Chess, Move } from "chess.js";
import User from "/lib/User";
import CommonLogger from "/lib/CommonLogger";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import Stoppable from "/lib/Stoppable";

export default abstract class CommonPlayedGame extends CommonBasicGame {
  private timerHandle?: number;

  private logger: CommonLogger;

  protected abstract endGame(status: GameStatus, status2: number): void;

  protected abstract internalMakeMove(
    move: Move,
    fen: string,
    result: GameStatus,
  ): void;

  protected abstract playerColor(who: User): PieceColor | null;

  protected get me(): BasicPlayedGameRecord {
    return this.game as BasicPlayedGameRecord;
  }

  constructor(
    parent: Stoppable | null,
    game: BasicPlayedGameRecord,
    dao: CommonReadOnlyGameDao,
  ) {
    super(parent, game, dao);
    this.logger = globalThis.ICCServer.utilities.getLogger(
      this,
      "CommonPlayedGame_js",
    );
  }

  private timeExpired(): void {
    if (this.me.tomove === "w") {
      this.endGame("0-1", 2);
    } else {
      this.endGame("1-0", 2);
    }
  }

  public startClock(): void {
    let clock: Clock;

    if (this.me.tomove === "w") {
      clock = this.me.clocks.w;
    } else {
      clock = this.me.clocks.b;
    }

    if (clock.initial.adjust?.type === "us") {
      this.startTimer(clock.initial.adjust.incseconds, () =>
        this.startTimer(clock.current, () => this.timeExpired()),
      );
      return;
    }

    this.startTimer(clock.current, () => this.timeExpired());
  }

  protected stopClock(): void {
    this.stopTimer();
  }

  private startTimer(milliseconds: number, fn: () => void): void {
    this.timerHandle = Meteor.setInterval(() => {
      this.stopTimer();
      fn();
    }, milliseconds);
  }

  private stopTimer(): void {
    if (this.timerHandle) Meteor.clearInterval(this.timerHandle);
  }

  protected stopping(): void {
    this.stopTimer();
  }

  public makeMove(who: User, move: string): void {
    const playercolor = this.playerColor(who);
    if (playercolor === this.me.tomove) {
      // One of the players is moving in turn
      const chess = new Chess(this.game.fen);
      const chessmove = chess.move(move);
      if (chessmove === null) throw new Meteor.Error("ILLEGAL_MOVE");
      this.stopTimer();
      let gameresult: GameStatus = "*";
      if (chess.game_over()) {
        if (chess.in_stalemate() || chess.in_draw()) {
          gameresult = "1/2-1/2";
        } else if (chess.in_checkmate()) {
          gameresult = chess.turn() === "w" ? "0-1" : "1-0";
        } else {
          this.logger.error(() => "Unknown status in chess engine");
        }
      }
      this.internalMakeMove(chessmove, chess.fen(), gameresult);
      this.startClock();
    } else if (!playercolor) {
      // The player is not playing in this game
      throw new Meteor.Error("NOT_A_PLAYER");
    } else {
      // The player is moving out of turn
      throw new Meteor.Error("NOT_YOUR_MOVE");
    }
  }
}
