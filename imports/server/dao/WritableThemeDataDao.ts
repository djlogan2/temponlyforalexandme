import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { ThemeDataRecord } from "/lib/records/ThemeRecord";
import Stoppable from "/lib/Stoppable";

export default class WritableThemeDataDao extends ReadWriteDao<ThemeDataRecord> {
  constructor(parent: Stoppable | null) {
    super("themedata", parent);
  }
}
