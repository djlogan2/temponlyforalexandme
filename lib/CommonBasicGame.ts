import { Meteor } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import { BasicGameRecord } from "/lib/records/GameRecord";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";

export default abstract class CommonBasicGame extends Stoppable {
  private readonly pId: string;

  private readonlydao: CommonReadOnlyGameDao;

  public get id(): string {
    return this.pId;
  }

  protected get me(): BasicGameRecord {
    const me = this.readonlydao.get(this.pId);
    if (!me) throw new Meteor.Error("UNABLE_TO_FIND_GAME");
    return me;
  }

  constructor(
    parent: Stoppable | null,
    id: string,
    readonlydao: CommonReadOnlyGameDao,
  ) {
    super(parent);
    this.pId = id;
    this.readonlydao = readonlydao;
  }
}
