import { Meteor } from "meteor/meteor";
import CommonBasicGame from "/lib/game/CommonBasicGame";
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

  private logger2: CommonLogger;

  protected abstract endGame(status: GameStatus, status2: number): void;

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
    this.logger2 = globalThis.ICCServer.utilities.getLogger(
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

  protected postmoveTasks(): void {
    this.stopTimer();
  }

  protected premoveTasks(): void {
    this.startClock();
  }
}
