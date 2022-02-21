import Stoppable from "/lib/Stoppable";
import {
  BasicGameRecord,
  ECOObject,
  GameStatus,
} from "/lib/records/GameRecord";
import User from "/lib/User";
import { Chess, Move } from "chess.js";
import { Meteor } from "meteor/meteor";
import CommonLogger from "/lib/CommonLogger";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import CommonSingleGameReadOnlyGameDao, {
  GameEvents,
} from "/imports/dao/CommonSingleGameReadOnlyGameDao";
import GlobalGame from "/lib/server/game/GlobalGame";

export default abstract class CommonBasicGame extends Stoppable {
  private logger: CommonLogger;

  protected pId: string;

  protected readonlydao: CommonSingleGameReadOnlyGameDao;

  protected abstract isAuthorizedToMove(who: User): boolean;

  protected abstract premoveTasks(): void;

  protected abstract postmoveTasks(): void;

  protected abstract endGame(status: GameStatus, status2: number): void;

  public get events(): BasicEventEmitter<GameEvents> {
    return this.readonlydao.events;
  }

  protected abstract internalMakeMove(
    move: Move,
    fen: string,
    result: GameStatus,
    result2: number,
    eco: ECOObject,
  ): void;

  protected get global(): GlobalGame {
    if (!globalThis.ICCServer.games[this.pId])
      globalThis.ICCServer.games[this.pId] = {
        chessObject: new Chess(),
      };
    return globalThis.ICCServer.games[this.pId];
  }

  protected get me(): BasicGameRecord {
    const record = this.readonlydao.get(this.pId);
    if (!record) throw new Meteor.Error("UNABLE_TO_FIND_GAME");
    return record;
  }

  constructor(
    parent: Stoppable | null,
    id: string,
    readonlydao: CommonSingleGameReadOnlyGameDao,
  ) {
    super(parent);
    this.logger = globalThis.ICCServer.utilities.getLogger(
      this,
      "CommonBasicGame_ts",
    );
    this.pId = id;
    this.readonlydao = readonlydao;
  }

  public getECO(fen: string): ECOObject {
    return {
      name: "UNKNOWN",
      code: "UNKNOWN",
    };
  }

  public makeMove(who: User, move: string): void {
    if (!this.isAuthorizedToMove(who))
      throw new Meteor.Error("CANNOT_MAKE_MOVE");
    this.makeMoveAuth(move);
  }

  protected abstract isClosing(): void;

  private close(): void {
    this.isClosing();
    delete globalThis.ICCServer.games[this.me._id];
  }

  protected makeMoveAuth(move: string): void {
    // const chess = new Chess(this.me.fen);
    const chessmove = this.global.chessObject.move(move, { sloppy: true });
    if (chessmove === null) throw new Meteor.Error("ILLEGAL_MOVE");
    this.premoveTasks();
    let gameresult: GameStatus = "*";
    let result2;
    if (this.global.chessObject.game_over()) {
      if (this.global.chessObject.in_stalemate()) {
        gameresult = "1/2-1/2";
        result2 = 14;
      } else if (this.global.chessObject.in_draw()) {
        gameresult = "1/2-1/2";
        if (this.global.chessObject.insufficient_material()) result2 = 18;
        else if (this.global.chessObject.in_threefold_repetition())
          result2 = 15;
        else result2 = 16;
      } else if (this.global.chessObject.in_checkmate()) {
        gameresult = this.global.chessObject.turn() === "w" ? "0-1" : "1-0";
        result2 = 1;
      } else {
        this.logger.error(() => "Unknown status in chess engine");
        result2 = 0;
      }
    } else result2 = 0;

    this.internalMakeMove(
      chessmove,
      this.global.chessObject.fen(),
      gameresult,
      result2,
      this.getECO(this.global.chessObject.fen()),
    );
    if (gameresult === "*") this.postmoveTasks();
    else {
      this.endGame(gameresult, result2);
      this.isClosing();
    }
  }
}
