import CommonTheme from "/lib/CommonTheme";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";

export default class ClientTheme extends CommonTheme {
  dao: ThemeReadOnlyDao;

  constructor(dao: ThemeReadOnlyDao) {
    super();
    this.dao = dao;
  }
}
