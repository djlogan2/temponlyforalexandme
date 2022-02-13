import Stoppable from "/lib/Stoppable";
import {
  BasicGameRecord,
  ECOObject,
  GameStatus,
  GameTypes,
} from "/lib/records/GameRecord";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import User from "/lib/User";
import { Chess, Move } from "chess.js";
import { Meteor } from "meteor/meteor";
import CommonLogger from "/lib/CommonLogger";

export default abstract class CommonBasicGame extends Stoppable {
  private logger: CommonLogger;

  protected game: BasicGameRecord;

  protected readonlydao: CommonReadOnlyGameDao;

  protected abstract isAuthorizedToMove(who: User): boolean;

  protected abstract premoveTasks(): void;

  protected abstract postmoveTasks(): void;

  protected abstract internalMakeMove(
    move: Move,
    fen: string,
    result: GameStatus,
    eco: ECOObject,
  ): void;

  public get id(): string {
    return this.game._id;
  }

  public get type(): GameTypes {
    return this.game.status;
  }

  constructor(
    parent: Stoppable | null,
    game: BasicGameRecord,
    readonlydao: CommonReadOnlyGameDao,
  ) {
    super(parent);
    this.logger = globalThis.ICCServer.utilities.getLogger(
      this,
      "CommonBasicGame_ts",
    );
    this.game = game;
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
    // One of the players is moving in turn
    const chess = new Chess(this.game.fen);
    const chessmove = chess.move(move);
    if (chessmove === null) throw new Meteor.Error("ILLEGAL_MOVE");
    this.premoveTasks();
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
    this.internalMakeMove(
      chessmove,
      chess.fen(),
      gameresult,
      this.getECO(chess.fen()),
    );
    this.postmoveTasks();
  }
}
