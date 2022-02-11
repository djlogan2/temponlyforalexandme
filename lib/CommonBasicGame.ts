import Stoppable from "/lib/Stoppable";
import { BasicGameRecord, GameTypes } from "/lib/records/GameRecord";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";

export default abstract class CommonBasicGame extends Stoppable {
  protected game: BasicGameRecord;

  protected readonlydao: CommonReadOnlyGameDao;

  public get id(): string {
    return this.game._id;
  }

  public get type(): GameTypes {
    return this.game.status;
  }

  constructor(
    parent: Stoppable | null,
    game: BasicGameRecord,
    readonlydao: CommonReadOnlyGameDao,
  ) {
    super(parent);
    this.game = game;
    this.readonlydao = readonlydao;
  }
}
