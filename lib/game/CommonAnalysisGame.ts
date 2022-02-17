import CommonBasicGame from "/lib/game/CommonBasicGame";
import { GameStatus } from "/lib/records/GameRecord";

export default abstract class CommonAnalysisGame extends CommonBasicGame {
  protected premoveTasks(): void {}

  protected postmoveTasks(): void {}

  protected endGame(status: GameStatus, status2: number) {
    // By default, an analyzed game does not have to ever "end"
    // But anyone can override this if they wish to know when a game enters this state.
  }
}
