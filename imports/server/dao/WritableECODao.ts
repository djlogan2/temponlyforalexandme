import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { ECORecord } from "/lib/records/ECORecord";
import Stoppable from "/lib/Stoppable";

export default class WritableECODao extends ReadWriteDao<ECORecord> {
  constructor(parent: Stoppable | null) {
    super("eco", parent);
  }
}
