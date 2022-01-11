import Stoppable from "/lib/Stoppable";
import UserRecord from "/lib/records/UserRecord";
import ServerLogger from "/lib/server/ServerLogger";
import ReadWriteDao from "/imports/server/dao/ReadWriteDao";

export default class WritableUserDao extends ReadWriteDao<UserRecord> {
  private logger: ServerLogger;

  protected onStop(): void {}

  constructor(parent: Stoppable | null) {
    super("users", parent);
    this.logger = new ServerLogger(this, "WritableUserDao_ts");
  }
}
