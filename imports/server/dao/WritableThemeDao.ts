import Stoppable from "/lib/Stoppable";
import ThemeRecord from "/lib/records/ThemeRecord";
import ServerLogger from "/lib/server/ServerLogger";
import ReadWriteDao from "/imports/server/dao/ReadWriteDao";

export default class WritableThemeDao extends ReadWriteDao<ThemeRecord> {
  private logger: ServerLogger;

  protected onStop(): void {}

  constructor(parent: Stoppable | null) {
    super("themes", parent);
    this.logger = new ServerLogger(this, "WritableThemeDao_ts");
  }
}
