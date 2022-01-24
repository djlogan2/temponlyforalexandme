import Commoni18n from "/lib/Commoni18n";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";

export default class Clienti18n extends Commoni18n {
  private dao: Clienti18nReadOnlyDao;

  public get events() {
    return this.dao.events;
  }

  constructor(dao: Clienti18nReadOnlyDao) {
    super();
    this.dao = dao;
    globalThis.i18n = this;
    // TODO: Just a dummy event to fire up the subscription. Like themes, we need to either have events to catch,
    //  or convert this into a class that doesn't need an event, or convert the server publication to a null
    //  publication.
    this.dao.events.on("event", () => {});
  }

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
}
