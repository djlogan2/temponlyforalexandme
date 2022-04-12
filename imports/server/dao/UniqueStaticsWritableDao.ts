import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import Stoppable from "/lib/Stoppable";
import { UniqueStaticsRecord } from "/lib/records/UniqueStaticsRecord";

export default class UniqueStaticsWritableDao extends ReadWriteDao<UniqueStaticsRecord> {
  constructor(parent: Stoppable | null) {
    super("uniquestatics", parent);
  }
}
