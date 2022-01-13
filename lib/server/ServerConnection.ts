import ConnectionRecord from "/lib/records/ConnectionRecord";
import Stoppable from "/lib/Stoppable";
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

export default class ServerConnection extends AbstractTimestampNode {
  private connectiondao: ConnectionDao;

  private connectionrecord: ConnectionRecord;

  private userservice: UserService;

  private userdao: CommonReadOnlyUserDao;

  private writableuserdao: WritableUserDao;

  private closefunctions: (() => void)[] = [];

  private idlefunctions: ((connectionid: string, msg: IdleMessage) => void)[] =
    [];

  private logger2 = new ServerLogger(this, "server/ServerConnection");

  private pUser?: ServerUser;

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
