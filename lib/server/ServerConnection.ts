import ConnectionRecord from "/lib/records/ConnectionRecord";
import Stoppable from "/lib/Stoppable";
import CommonReadOnlyI18nDao from "../../imports/dao/CommonReadOnlyI18nDao";
import WritableI18nDao from "../../imports/server/dao/WritableI18nDao";
import I18nService from "../../imports/server/service/I18nService";
import AbstractTimestampNode from "../AbstractTimestampNode";
import { PingMessage } from "../records/PingMessage";
import { PongMessage } from "../records/PongMessage";
import { PongResponse } from "../records/PongResponse";
import { Meteor } from "meteor/meteor";
import ServerLogger from "/lib/server/ServerLogger";
import { IdleMessage } from "/lib/records/IdleMessage";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import ServerUser from "/lib/server/ServerUser";
import UserService from "/imports/server/service/UserService";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import ServerI18n from "./ServerI18n";
import ServerTheme from "./ServerTheme";
import ThemeService from "/imports/server/service/ThemeService";
// I think that 99% of the time, we do not need the server to use the clients read only dao
// The WritableThemeDown in this case will basically do 100% of what the read only dao will do
// The only two reason the server would ever need the CommonReadOnly guy would be if there
//      was a "CommonTheme" class that read from the CommonThemeDao
// If the server needed to start() listeners the CommonThemeDao provided.
//    However, it could just use WritableReactiveDao for that
// I haven't looked through all of the code to see if this is necessary, but I'm betting it's not.
import CommonReadOnlyThemeDao from "/imports/dao/CommonReadOnlyThemeDao";
// This is the one we would use
import WritableThemeDao from "/imports/server/dao/WritableThemeDao";

export default class ServerConnection extends AbstractTimestampNode {
  private connectiondao: ConnectionDao;

  private connectionrecord: ConnectionRecord;

  private userservice: UserService;

  private userdao: CommonReadOnlyUserDao;

  private writableuserdao: WritableUserDao;

  private themeservice: ThemeService;

  private themedao: CommonReadOnlyThemeDao;

  private writablethemedao: WritableThemeDao;

  private i18nservice: I18nService;

  private i18ndao: CommonReadOnlyI18nDao;

  private writablei18ndao: WritableI18nDao;

  private closefunctions: (() => void)[] = [];

  private idlefunctions: ((connectionid: string, msg: IdleMessage) => void)[] =
    [];

  private logger2 = new ServerLogger(this, "server/ServerConnection");

  private pUser?: ServerUser;

  private theme?: ServerTheme;

  private i18n?: ServerI18n;

  private pIdle?: IdleMessage;

  public get isIdle(): boolean {
    if (!this.pIdle) return false;
    return this.pIdle.idleseconds > 60;
  }

  public get idleSeconds(): number {
    if (!this.pIdle) return 0;
    return this.pIdle.idleseconds;
  }

  public get _id(): string {
    return this.connectionrecord._id;
  }

  public get connectionid(): string {
    return this.connectionrecord.connectionid;
  }

  protected stopping(): void {
    super.stopping();
    this.logger2.trace(() => `${this.connectionid} stopping`);
    this.closing();
  }

  public idleMessage(idle: IdleMessage): void {
    this.pIdle = idle;
    this.logger2.trace(() => `idle=${JSON.stringify(idle)}`);
    this.connectiondao.update(
      { connectionid: this.connectionid },
      { $set: { focused: idle.focused, idleseconds: idle.idleseconds } },
    );
    this.idlefunctions.forEach((fn) => fn(this.connectionid, idle));
    if (this.pUser) this.pUser.updateIdle(this.connectionid, idle.idleseconds);
  }

  public handleDirectMessage(messagetype: string, message: any) {
    this.logger2.trace(
      () =>
        `${
          this.connectionid
        } handleDirectMessage: ${messagetype}: ${JSON.stringify(message)}`,
    );
    switch (messagetype) {
      case "ping":
      case "pong":
      case "rslt":
        this.processIncomingMessage(message);
        break;
      default:
        throw new Meteor.Error("UNKNOWN_DIRECT_MESSAGE", messagetype);
    }
  }

  constructor(
    parent: Stoppable | null,
    connectionrecord: ConnectionRecord,
    connectiondao: ConnectionDao,
    userservice: UserService,
    readonlyuserdao: CommonReadOnlyUserDao,
    writableuserdao: WritableUserDao,
    themeservice: ThemeService,
    readonlythemedao: CommonReadOnlyThemeDao,
    writablethemedao: WritableThemeDao,
    i18nservice: I18nService,
    readonlyi18ndao: CommonReadOnlyI18nDao,
    writablei18ndao: WritableI18nDao,
  ) {
    super(parent, 60);
    this.logger2.trace(
      () => `constructor: ${JSON.stringify(connectionrecord)}`,
    );
    this.userdao = readonlyuserdao;
    this.writableuserdao = writableuserdao;
    this.userservice = userservice;
    this.connectionrecord = connectionrecord;
    this.connectiondao = connectiondao;
    this.themedao = readonlythemedao;
    this.writablethemedao = writablethemedao;
    this.themeservice = themeservice;
    this.i18nservice = i18nservice;
    this.writablei18ndao = writablei18ndao;
    this.i18ndao = readonlyi18ndao;

    this.theme = new ServerTheme(this, this.themedao, this.writablethemedao);
    this.i18n = new ServerI18n(this, this.writablei18ndao);
    this.start();
  }

  private closing(): void {
    this.logger2.trace(() => `${this.connectionid} closing`);
    this.closefunctions.forEach((func) => func());
  }

  public onClose(func: () => void): void {
    this.logger2.trace(() => `${this.connectionid} onClose`);
    this.closefunctions.push(func);
  }

  public onIdle(fn: (connectionid: string, msg: IdleMessage) => void): void {
    this.idlefunctions.push(fn);
  }

  protected sendFunction(msg: PingMessage | PongMessage | PongResponse): void {
    this.logger2.trace(
      () => `${this.connectionid} sendFunction: ${JSON.stringify(msg)}`,
    );
    Meteor.directStream.send(
      JSON.stringify({ iccdm: msg.type, iccmsg: msg }),
      this.connectionid,
    );
  }

  public login(hashtoken: string): string {
    const id = this.userservice.logon(hashtoken);
    this.pUser = new ServerUser(this, id, this.userdao, this.writableuserdao);
    return id;
  }

  public get user(): ServerUser | undefined {
    return this.pUser;
  }
}
