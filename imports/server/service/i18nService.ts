import I18nPublication from "/lib/server/I18nPublication";
import Writablei18nDao from "/imports/server/dao/Writablei18nDao";
import { i18nRecord } from "/lib/records/i18nRecord";
import { Mongo } from "meteor/mongo";

export default class I18nService {
  private dao: Writablei18nDao;

  constructor(dao: Writablei18nDao) {
    this.dao = dao;
  }

  public getLocaleSelector(locale: string): Mongo.Selector<i18nRecord> {
    return this.dao.getLocaleSelector(locale);
  }
}

globalThis.ICCServer.utilities.publish("i18n", function () {
  const connection = globalThis.ICCServer.utilities.getConnection(
    this.connection,
  );
  if (!connection) return;
  const _i18n = new I18nPublication(connection, this);
  if (!connection.user) this.ready();
});
