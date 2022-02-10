import { GameStatus } from "../records/GameRecord";
import CommonComputerPlayedGame from "/lib/CommonComputerPlayedGame";
import Stoppable from "/lib/Stoppable";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import WritableGameDao from "/imports/server/dao/WritableGameDao";

export default class ServerComputerPlayedGame extends CommonComputerPlayedGame {
  private dao: WritableGameDao;

  constructor(
    parent: Stoppable | null,
    id: string,
    readonlydao: CommonReadOnlyGameDao,
    writabledao: WritableGameDao,
  ) {
    super(parent, id, readonlydao);
    this.dao = writabledao;
  }

  protected stopping() {
    super.stopping();
  }

  public endGame(status: GameStatus, status2: number): void {
    this.dao.update(
      { _id: this.id },
      { $set: { status: "analyzing", result: status, result2: status2 } },
    );
  }
}
