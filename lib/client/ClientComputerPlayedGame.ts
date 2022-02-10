import { GameStatus } from "../records/GameRecord";
import CommonComputerPlayedGame from "/lib/CommonComputerPlayedGame";

export class ClientComputerPlayedGame extends CommonComputerPlayedGame {
  // constructor(parent: Stoppable | null, id: string, readonlydao: CommonGameReadOnlyDao) {
  //     super(parent, id, readonlydao);
  // }

  protected endGame(status: GameStatus, status2: number): void {
    throw new Error("Method not implemented.");
  }
}
