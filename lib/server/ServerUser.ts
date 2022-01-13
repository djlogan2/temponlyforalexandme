import User from "/lib/User";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";

export default class ServerUser extends User {
  private isidle: boolean = false;

  private idledata: { [connectionid: string]: number } = {};

  private writableuserdao: WritableUserDao;

  setLocale(locale: string): void {
    this.writableuserdao.update({ _id: this.id }, { $set: { locale } });
  }

  constructor(
    id: string,
    userdao: CommonReadOnlyUserDao,
    writabledao: WritableUserDao,
  ) {
    super(id, userdao);
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
}
