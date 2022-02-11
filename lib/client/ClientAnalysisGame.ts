import CommonAnalysisGame from "/lib/CommonAnalysisGame";

export default class ClientAnalysisGame extends CommonAnalysisGame {
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
}
