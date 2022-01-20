import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { ThemeHeaderRecord } from "/lib/records/ThemeRecord";
import Stoppable from "/lib/Stoppable";

export default class WritableThemeHeaderDao extends ReadWriteDao<ThemeHeaderRecord> {
  constructor(parent: Stoppable | null) {
    super("themeheaders", parent);
  }
}
