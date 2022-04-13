import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { StaticsRecord } from "/lib/records/StaticsRecord";
import Stoppable from "/lib/Stoppable";

export default class StaticsWritableDao extends ReadWriteDao<StaticsRecord> {
  constructor(parent: Stoppable | null) {
    super("statics", parent);
  }
}
