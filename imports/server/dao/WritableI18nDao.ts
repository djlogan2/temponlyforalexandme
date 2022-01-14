import Stoppable from "/lib/Stoppable";
import ClientI18nRecord from "../../../lib/records/ClientI18nRecord";
import ServerLogger from "/lib/server/ServerLogger";
import ReadWriteDao from "/imports/server/dao/ReadWriteDao";

export default class WritableI18nDao extends ReadWriteDao<ClientI18nRecord> {
  private logger: ServerLogger;

  protected onStop(): void {}

  constructor(parent: Stoppable | null) {
    super("clientI18n", parent);
    this.logger = new ServerLogger(this, "WritableI18nDao_ts");
  }
}
