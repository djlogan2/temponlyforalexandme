import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { UserRecord } from "/lib/records/UserRecord";
import Stoppable from "/lib/Stoppable";

export default class WritableUserDao extends ReadWriteDao<UserRecord> {
  constructor(parent: Stoppable | null) {
    super("users", parent);
  }
}
