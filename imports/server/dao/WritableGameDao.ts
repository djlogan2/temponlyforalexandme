import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import Stoppable from "/lib/Stoppable";
import { BasicGameRecord } from "/lib/records/GameRecord";

export default class WritableGameDao extends ReadWriteDao<BasicGameRecord> {
  constructor(parent: Stoppable | null) {
    super("games", parent);
  }
}
