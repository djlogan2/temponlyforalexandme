import Commoni18n from "/lib/Commoni18n";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";

export default class Clienti18n extends Commoni18n {
  private dao: Clienti18nReadOnlyDao;

  constructor(dao: Clienti18nReadOnlyDao) {
    super();
    this.dao = dao;
    globalThis.i18n = this;
  }

  public localize(token: string): string {
    // we have to get it from the database
    const record = this.dao.readOne({ token });
    return record?.text || token;
  }
}
