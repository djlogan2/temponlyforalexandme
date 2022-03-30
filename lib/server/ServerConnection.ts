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
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import { EventEmitter } from "eventemitter3";
import UserService from "/imports/server/service/UserService";
import ServerUser from "/lib/server/ServerUser";

export default class ServerConnection extends AbstractTimestampNode {
  private connectiondao: ConnectionDao;

  private connectionrecord: ConnectionRecord;

  private userservice: UserService;

  private readonly userdao: CommonReadOnlyUserDao;

  private readonly writableuserdao: WritableUserDao;

  private pEvents = new EventEmitter<
    "idlemessage" | "closing" | "userlogin" | "userlogout"
  >();

  public get events() {
    return this.pEvents;
  }

  // private closefunctions: (() => void)[] = [];
  //
  // private idlefunctions: ((connectionid: string, msg: IdleMessage) => void)[] =
  //   [];

  private logger2 = new ServerLogger(this, "server/ServerConnection");

  private pUser?: ServerUser;

  private pIdle?: IdleMessage;

  private locale: string = "en_us";

  public get isIdle(): boolean {
    if (!this.pIdle) return false;
    return this.pIdle.idleseconds > 60;
  }

  public get _id(): string {
    return this.connectionrecord._id;
  }

  public get connectionid(): string {
    return this.connectionrecord.connectionid;
  }

  public get user(): ServerUser | undefined {
    return this.pUser;
  }

  protected stopping(): void {
    super.stopping();
    this.logger2.debug(() => `${this.connectionid} stopping`);
    this.closing();
  }

  public idleMessage(idle: IdleMessage): void {
    this.pIdle = idle;
    this.logger2.debug(() => `idle=${JSON.stringify(idle)}`);
    this.connectiondao.update(
      { connectionid: this.connectionid },
      { $set: { focused: idle.focused, idleseconds: idle.idleseconds } },
    );
    this.events.emit("idlemessage", this.connectionid, idle);
    if (this.pUser) this.pUser.updateIdle(this.connectionid, idle.idleseconds);
  }

  public handleDirectMessage(messagetype: string, message: any) {
    this.logger2.debug(
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
    this.logger2.debug(
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
    this.logger2.debug(() => `${this.connectionid} closing`);
    this.events.emit("closing");
  }

  protected sendFunction(msg: PingMessage | PongMessage | PongResponse): void {
    this.logger2.debug(
      () => `${this.connectionid} sendFunction: ${JSON.stringify(msg)}`,
    );
    Meteor.directStream.send(
      JSON.stringify({ iccdm: msg.type, iccmsg: msg }),
      this.connectionid,
    );
  }

  public login(hashtoken: string, locale: string): string {
    this.logger2.debug(
      () =>
        `${this.connectionid} login hashtoken=${hashtoken} locale=${locale}`,
    );
    this.locale = locale;
    const id = this.userservice.logon(hashtoken, locale);
    this.pUser = new ServerUser(this, id, this.userdao, this.writableuserdao);
    this.events.emit("userlogin", this.pUser);
    this.logger2.debug(
      () => `${this.connectionid} login emitted "userlogin", userid=${id}`,
    );
    return id;
  }
}
