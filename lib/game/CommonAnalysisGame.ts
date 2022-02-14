import CommonBasicGame from "/lib/game/CommonBasicGame";

export default abstract class CommonAnalysisGame extends CommonBasicGame {
  protected premoveTasks(): void {}

  protected postmoveTasks(): void {}
}
