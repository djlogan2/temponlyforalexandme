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
import CommonSingleGameReadOnlyGameDao from "/imports/dao/CommonSingleGameReadOnlyGameDao";

export default abstract class CommonBasicGame extends Stoppable {
  private logger: CommonLogger;

  protected pId: string;

  protected readonlydao: CommonSingleGameReadOnlyGameDao;

  protected abstract isAuthorizedToMove(who: User): boolean;

  protected abstract premoveTasks(): void;

  protected abstract postmoveTasks(): void;

  public get events(): BasicEventEmitter<"move"> {
    return this.readonlydao.events;
  }

  protected abstract internalMakeMove(
    move: Move,
    fen: string,
    result: GameStatus,
    result2: number,
    eco: ECOObject,
  ): void;

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

  protected makeMoveAuth(move: string): void {
    const chess = new Chess(this.me.fen);
    const chessmove = chess.move(move);
    if (chessmove === null) throw new Meteor.Error("ILLEGAL_MOVE");
    this.premoveTasks();
    let gameresult: GameStatus = "*";
    let result2;
    if (chess.game_over()) {
      if (chess.in_stalemate()) {
        gameresult = "1/2-1/2";
        result2 = 14;
      } else if (chess.in_draw()) {
        gameresult = "1/2-1/2";
        if (chess.insufficient_material()) result2 = 18;
        else result2 = 16;
      } else if (chess.in_threefold_repetition()) {
        gameresult = "1/2-1/2";
        result2 = 15;
      } else if (chess.in_checkmate()) {
        gameresult = chess.turn() === "w" ? "0-1" : "1-0";
        result2 = 1;
      } else {
        this.logger.error(() => "Unknown status in chess engine");
        result2 = 0;
      }
    } else result2 = 0;

    this.internalMakeMove(
      chessmove,
      chess.fen(),
      gameresult,
      result2,
      this.getECO(chess.fen()),
    );
    this.postmoveTasks();
  }
}
