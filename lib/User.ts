import { Meteor } from "meteor/meteor";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import UserRecord from "/lib/records/UserRecord";
import { check } from "meteor/check";
import Stoppable from "/lib/Stoppable";

export default abstract class User extends Stoppable {
  protected userdao: CommonReadOnlyUserDao;

  private readonly pId: string;

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

  protected constructor(
    parent: Stoppable | null,
    id: string,
    userdao: CommonReadOnlyUserDao,
  ) {
    super(parent);
    this.pId = id;
    this.userdao = userdao;
  }
}

Meteor.methods({
  "User.setLocale"(locale: string) {
    check(locale, String);
    const user = globalThis.ICCServer.utilities.getUser(this.connection);
    if (!user) return;
    user.setLocale(locale);
  },
});
