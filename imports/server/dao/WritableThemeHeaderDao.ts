import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { ThemeRecord } from "/lib/records/ThemeRecord";
import Stoppable from "/lib/Stoppable";

export default class WritableThemeHeaderDao extends ReadWriteDao<ThemeRecord> {
  constructor(parent: Stoppable | null) {
    super("themes", parent);
  }
}
