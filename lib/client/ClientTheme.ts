import CommonTheme from "/lib/CommonTheme";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";

export default class ClientTheme extends CommonTheme {
  dao: ThemeReadOnlyDao;

  public get events() {
    return this.dao.events;
  }

  //
  // window.theme.on('themechanged', (reactclass) => {});
  //
  constructor(dao: ThemeReadOnlyDao) {
    super();
    globalThis.theme = this;
    this.dao = dao;
    this.events.on("themechanged", (reactclass: any) => {
      console.log(`THEME: ${JSON.stringify(reactclass)}`);
    });
  }

  public getTheme = () => this.dao.readOne({});
}
