import CommonTheme from "/lib/CommonTheme";
import ClientThemeReadOnlyDao from "/imports/client/dao/ClientThemeReadOnlyDao";
import ClientLogger from "/lib/client/ClientLogger";
import Stoppable from "/lib/Stoppable";

export default class ClientTheme extends CommonTheme {
  dao: ClientThemeReadOnlyDao;

  public get events() {
    return this.dao.events;
  }

  private logger: ClientLogger;

  public isReady = false;

  constructor(parent: Stoppable | null, dao: ClientThemeReadOnlyDao) {
    super(parent);
    this.logger = new ClientLogger(this, "ClientTheme_js");
    globalThis.theme = this;
    this.dao = dao;

    this.events.on("themechanged", (reactclass: any) => {
      this.logger.debug(() => `THEME: ${JSON.stringify(reactclass)}`);
    });

    const readyHandler = () => {
      this.logger.debug(() => "The ClientTheme is ready");
      this.isReady = true;
      this.events.off("ready", readyHandler);
    };

    this.events.on("ready", readyHandler);
  }

  public getTheme = () => this.dao.readOne({});

  public getThemes = () => this.dao.readMany({});

  protected stopping(): void {
    throw new Error("Method not implemented.");
  }
}
