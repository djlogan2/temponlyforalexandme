import CommonGame from "/lib/CommonGame";
import CommonReadOnlyPlayedGameDao from "/imports/dao/CommonReadOnlyPlayedGameDao";

export default class CommonPlayedGame extends CommonGame {
  private dao: CommonReadOnlyPlayedGameDao;

  constructor(dao: CommonReadOnlyPlayedGameDao) {
    super();
    this.dao = dao;
  }
}
