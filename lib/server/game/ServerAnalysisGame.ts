import { Move } from "chess.js";
import CommonAnalysisGame from "/lib/game/CommonAnalysisGame";
import { GameStatus, ECOObject } from "/lib/records/GameRecord";
import User from "/lib/User";
import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import Stoppable from "/lib/Stoppable";

export default class ServerAnalysisGame extends CommonAnalysisGame {
  constructor(
    parent: Stoppable | null,
    id: string,
    writabledao: WritableGameDao,
  ) {
    super(parent, id, new ServerReadOnlyGameDao(parent, id, writabledao));
  }

  protected isAuthorizedToMove(who: User): boolean {
    throw new Error("Method not implemented.");
  }

  protected internalMakeMove(
    move: Move,
    fen: string,
    result: GameStatus,
    result2: number,
    eco: ECOObject,
  ): void {
    throw new Error("Method not implemented.");
  }

  protected stopping(): void {}

  protected isClosing(): void {}
}
