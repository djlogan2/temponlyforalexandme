import CommonTheme from "/lib/CommonTheme";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";

export default class ClientTheme extends CommonTheme {
  dao: ThemeReadOnlyDao;

  public get events() {
    return this.dao.events;
  }

  public isReady = false;

  //
  // window.theme.on('themechanged', (reactclass) => {});
  //
  constructor(dao: ThemeReadOnlyDao) {
    super();
    globalThis.theme = this;
    this.dao = dao;
  }

  public getTheme = () => this.dao.readOne({});

  public getThemes = () => this.dao.readMany({});
}
