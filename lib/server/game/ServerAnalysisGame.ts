import { Move } from "chess.js";
import CommonAnalysisGame from "/lib/game/CommonAnalysisGame";
import { GameStatus, ECOObject } from "/lib/records/GameRecord";
import User from "/lib/User";

export default class ServerAnalysisGame extends CommonAnalysisGame {
  protected isAuthorizedToMove(who: User): boolean {
    throw new Error("Method not implemented.");
  }

  protected internalMakeMove(
    move: Move,
    fen: string,
    result: GameStatus,
    eco: ECOObject,
  ): void {
    throw new Error("Method not implemented.");
  }

  protected stopping(): void {}
}
