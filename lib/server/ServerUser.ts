import User from "/lib/User";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import Stoppable from "/lib/Stoppable";
import EventEmitter from "eventemitter3";
import { ClientCallObject } from "/lib/server/AbstractClientMethod";

export default class ServerUser extends User {
  private isidle: boolean = false;

  private idledata: { [connectionid: string]: number } = {};

  private writableuserdao: WritableUserDao;

  private pEvents = new EventEmitter<"locale" | "theme">();

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
