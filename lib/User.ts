import { Meteor } from "meteor/meteor";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import UserRecord from "/lib/records/UserRecord";
import ConnectionService from "/imports/server/service/ConnectionService";
import { check } from "meteor/check";

export default abstract class User {
  protected userdao: CommonReadOnlyUserDao;

  private pId: string;

  abstract setLocale(locale: string): void;

  protected get me(): UserRecord {
    const me = this.userdao.get(this.pId);
    if (!me) throw new Meteor.Error("UNABLE_TO_FIND_USER");
    return me;
  }

  get locale(): string {
    return this.me.locale;
  }

  public get id(): string {
    return this.pId;
  }

  constructor(id: string, userdao: CommonReadOnlyUserDao) {
    this.pId = id;
    this.userdao = userdao;
  }
}

Meteor.methods({
  "User.setLocale"(locale: string) {
    check(locale, String);
    if (!globalThis.ICCServer.services.connectionservice)
      throw new Meteor.Error("UNABLE_TO_FIND_CONNECTION_SERVICE");
    if (!this.connection?.id)
      throw new Meteor.Error("UNABLE_TO_FIND_CONNECTION_ID");
    const user = globalThis.ICCServer.services.connectionservice.getUser(
      this.connection?.id,
    );
    if (!user) return;
    user.setLocale(locale);
  },
});
