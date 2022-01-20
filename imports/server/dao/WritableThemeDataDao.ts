import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { ThemeData } from "/lib/records/ThemeRecord";
import Stoppable from "/lib/Stoppable";

export default class WritableThemeDataDao extends ReadWriteDao<ThemeData> {
  constructor(parent: Stoppable | null) {
    super("themedata", parent);
  }
}
