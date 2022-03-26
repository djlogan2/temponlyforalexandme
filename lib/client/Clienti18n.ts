import Commoni18n from "/lib/Commoni18n";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ClientLogger from "./ClientLogger";
import Stoppable from "../Stoppable";

export default class Clienti18n extends Commoni18n {
  private dao: Clienti18nReadOnlyDao;

  public get events() {
    return this.dao.events;
  }

  private logger: ClientLogger;

  public isReady = false;

  constructor(parent: Stoppable | null, dao: Clienti18nReadOnlyDao) {
    super(parent);
    this.logger = new ClientLogger(this, "Clienti18n_js");
    globalThis.i18n = this;
    this.dao = dao;

    const readyHandler = () => {
      this.logger.trace(() => "The Clienti18n is ready");
      this.isReady = true;
      this.events.off("ready", readyHandler);
    };

    this.events.on("ready", readyHandler);
  }

  public findTranslation = (token: string, locale: string) => {
    const translation = this.dao.readOne({ token, locale });

    if (translation) {
      this.events.emit("translationchanged", translation);
    }
  };

  public translate(token: string, ...args: string[]): string {
    const record = this.dao.readOne({ token });
    if (!record) return token;

    let translatedtext = record.text;

    for (let x = 0; x < args.length; x += 1) {
      const replacement = `{${x}}`;
      translatedtext = translatedtext.replaceAll(replacement, args[x]);
    }
    return translatedtext;
  }

  protected stopping(): void {
    throw new Error("Method not implemented.");
  }
}
