import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import Stoppable from "/lib/Stoppable";
import { BasicGameRecord, GameAuditRecord } from "/lib/records/GameRecord";
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export default class WritableGameDao extends ReadWriteDao<BasicGameRecord> {
  constructor(parent: Stoppable | null) {
    super("games", parent);
  }

  public update(
    selector: Mongo.Selector<BasicGameRecord>,
    modifier: Mongo.Modifier<BasicGameRecord>,
  ): number {
    // @ts-ignore
    if (!modifier.$set?.actions) throw new Meteor.Error("SERVER_ERROR");
    return super.update(selector, modifier);
  }
}
