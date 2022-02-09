import CommonAnalysisGame from "/lib/CommonAnalysisGame";
import { GameReadOnlyDao } from "/imports/client/dao/GameReadOnlyDao";
import Stoppable from "/lib/Stoppable";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";

export default class ClientAnalysisGame extends CommonAnalysisGame {
  private dao: GameReadOnlyDao;

  public get events() {
    return this.dao.events;
  }

  constructor(
    parent: Stoppable | null,
    id: string,
    readonlydao: CommonReadOnlyGameDao,
    gamereadonlydao: GameReadOnlyDao,
  ) {
    super(parent, id, readonlydao);
    this.dao = gamereadonlydao;
  }

  protected stopping(): void {}
}
