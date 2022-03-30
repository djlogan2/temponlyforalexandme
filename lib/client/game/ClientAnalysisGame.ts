import { Move } from "chess.js";
import CommonAnalysisGame from "/lib/game/CommonAnalysisGame";
import { GameStatus } from "/lib/records/GameRecord";
import User from "/lib/User";

export default class ClientAnalysisGame extends CommonAnalysisGame {
  protected internalSetFen(who: string, fen: string): void {
    throw new Error("Method not implemented.");
  }

  protected isAuthorizedToMove(who: User): boolean {
    throw new Error("Method not implemented.");
  }

  protected premoveTasks(): void {
    throw new Error("Method not implemented.");
  }

  protected postmoveTasks(): void {
    throw new Error("Method not implemented.");
  }

  protected internalMakeMove(
    who: string,
    move: Move,
    fen: string,
    result: GameStatus,
    result2: number,
  ): void {
    throw new Error("Method not implemented.");
  }

  public get events() {
    return this.readonlydao.events;
  }

  // constructor(
  //   parent: Stoppable | null,
  //   game: AnalysisGameRecord,
  //   gamereadonlydao: CommonReadOnlyGameDao,
  // ) {
  //   super(parent, game, gamereadonlydao);
  // }

  protected stopping(): void {}

  protected isClosing(): void {}
}
