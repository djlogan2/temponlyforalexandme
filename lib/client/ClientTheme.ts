import CommonTheme from "/lib/CommonTheme";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";

export default class ClientTheme extends CommonTheme {
  dao: ThemeReadOnlyDao;

  public get events() {
    return this.dao.events;
  }

  constructor(dao: ThemeReadOnlyDao) {
    super();
    this.dao = dao;
    globalThis.theme = this;
    this.events.on("themechanged", (reactclass: any) => {
      console.log(`THEME: ${JSON.stringify(reactclass)}`);
    });
  }

  public getTheme = () => this.dao.readOne({});

  public getThemes = () => this.dao.readMany({});
}
