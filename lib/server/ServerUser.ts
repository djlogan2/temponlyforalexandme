import User, { UserEvents } from "/lib/User";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import Stoppable from "/lib/Stoppable";
import EventEmitter from "eventemitter3";
import { UserRoles } from "/lib/enums/Roles";

export default class ServerUser extends User {
  private isidle: boolean = false;

  private idledata: { [connectionid: string]: number } = {};

  private writableuserdao: WritableUserDao;

  private pEvents = new EventEmitter<UserEvents>();

  public get events() {
    return this.pEvents;
  }

  public setTheme(theme: string | null): void {
    if (theme)
      this.writableuserdao.update({ _id: this.id }, { $set: { theme } });
    else
      this.writableuserdao.update({ _id: this.id }, { $unset: { theme: 1 } });
    this.pEvents.emit("theme", theme);
  }

  public setLocale(locale: string): void {
    this.writableuserdao.update({ _id: this.id }, { $set: { locale } });
    this.pEvents.emit("locale", locale);
  }

  public removeRole(role: UserRoles): void {
    this.writableuserdao.update({ _id: this.id }, { $pull: { roles: role } });
    this.pEvents.emit("roleremoved", role);
  }

  public addRole(role: UserRoles): void {
    if (
      this.writableuserdao.update(
        { _id: this.id },
        { $addToSet: { roles: role } },
      ) > 0
    )
      this.pEvents.emit("roleadded", role);
  }

  constructor(
    parent: Stoppable | null,
    id: string,
    userdao: CommonReadOnlyUserDao,
    writabledao: WritableUserDao,
  ) {
    super(parent, id, userdao);
    this.writableuserdao = writabledao;
  }

  public updateIdle(connectionid: string, idleseconds: number): void {
    this.idledata[connectionid] = idleseconds;
    const min = Math.min(...Object.values(this.idledata));
    if (this.isidle !== min > 60) {
      this.isidle = min > 60;
      if (this.isidle) {
        this.writableuserdao.update(
          { _id: this.id },
          { $set: { idleSince: new Date() } },
        );
      } else {
        this.writableuserdao.update(
          { _id: this.id },
          { $unset: { idleSince: 1 } },
        );
      }
    }
  }

  protected stopping(): void {}
}
