import Stoppable from "/lib/Stoppable";
import { BasicGameRecord } from "/lib/records/GameRecord";
import CommonComputerPlayedGame from "/lib/CommonComputerPlayedGame";
import CommonAnalysisGame from "/lib/CommonAnalysisGame";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";

export default abstract class CommonGameService extends Stoppable {
  protected dao: CommonReadOnlyGameDao;

  constructor(parent: Stoppable | null, dao: CommonReadOnlyGameDao) {
    super(parent);
    this.dao = dao;
  }

  protected abstract getClassFromType(
    game: BasicGameRecord,
  ): CommonComputerPlayedGame | CommonAnalysisGame;

  public getTyped(
    id: string,
  ): CommonComputerPlayedGame | CommonAnalysisGame | undefined {
    const game = this.dao.get(id);
    if (!game) return undefined;
    return this.getClassFromType(game);
  }
}
