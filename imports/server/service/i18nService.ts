import I18nPublication from "/lib/server/I18nPublication";
import Writablei18nDao from "/imports/server/dao/Writablei18nDao";
import { i18nRecord } from "/lib/records/i18nRecord";
import { Mongo } from "meteor/mongo";
import ConnectionService from "/imports/server/service/ConnectionService";
import PublicationService from "/imports/server/service/PublicationService";
import ServerConnection from "/lib/server/ServerConnection";
import { Subscription } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import ServerUser from "/lib/server/ServerUser";
import { translations } from "../i18n/en-us";

export default class I18nService extends Stoppable {
  private dao: Writablei18nDao;

  constructor(
    parent: Stoppable | null,
    dao: Writablei18nDao,
    connectionservice: ConnectionService,
    publicationservice: PublicationService,
  ) {
    super(parent);
    this.dao = dao;
    publicationservice.publishDao(
      "i18n",
      (
        sub: Subscription,
        connection: ServerConnection | null,
        user: ServerUser | null,
        ...args: any[]
      ) => new I18nPublication(parent, this, sub, connection, user),
    );

    translations.forEach((t) => {
      if (!this.dao.readOne({ text: t.text })) {
        this.dao.insert(t);
      }
    });
  }

  public getLocaleSelector(locale: string): Mongo.Selector<i18nRecord> {
    return this.dao.getLocaleSelector(locale);
  }

  protected stopping(): void {}
}
