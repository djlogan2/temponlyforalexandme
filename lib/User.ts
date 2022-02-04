import { Meteor } from "meteor/meteor";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import UserRecord from "/lib/records/UserRecord";
import { check } from "meteor/check";
import Stoppable from "/lib/Stoppable";
import { UserRoles } from "./Roles";

export default abstract class User extends Stoppable {
  protected userdao: CommonReadOnlyUserDao;

  private readonly pId: string;

  abstract setLocale(locale: string): void;

  abstract setTheme(theme: string | null): void;

  protected get me(): UserRecord {
    const me = this.userdao.get(this.pId);
    if (!me) throw new Meteor.Error("UNABLE_TO_FIND_USER");
    return me;
  }

  public get isolation_group(): string {
    return this.me.isolation_group;
  }

  public get roles(): UserRoles[] {
    return this.me.roles;
  }

  public isAuthorized(roles: string[]): boolean {
    if (this.me.isdeveloper) return true;
    return this.roles.some((requestedrole) =>
      this.me.roles.some((userrole) => userrole === requestedrole),
    );
  }

  get locale(): string {
    return this.me.locale;
  }

  get theme(): string {
    return this.me.theme;
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
