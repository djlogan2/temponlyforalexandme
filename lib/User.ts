import { Meteor } from "meteor/meteor";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import UserRecord, { RatingObject, RatingTypes } from "/lib/records/UserRecord";
import Stoppable from "/lib/Stoppable";
import { UserRoles } from "./enums/Roles";

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

  public get username(): string | undefined {
    return this.me.username;
  }

  public get titles(): string[] {
    return this.me.titles || [];
  }

  public get isolation_group(): string {
    return this.me.isolation_group;
  }

  public get roles(): UserRoles[] {
    return this.me.roles;
  }

  public get ratings(): { [R in RatingTypes]: RatingObject } {
    return this.me.ratings;
  }

  public isAuthorized(roles: string[]): boolean {
    if (this.me.isdeveloper) return true;
    return roles.some((requestedrole) =>
      this.roles.some((userrole) => userrole === requestedrole),
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
