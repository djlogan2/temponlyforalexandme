import ConnectionRecord from "/lib/records/ConnectionRecord";
import Stoppable from "/lib/Stoppable";
import AbstractTimestampNode from "../AbstractTimestampNode";
import { PingMessage } from "../records/PingMessage";
import { PongMessage } from "../records/PongMessage";
import { PongResponse } from "../records/PongResponse";
import { Meteor } from "meteor/meteor";
import ServerLogger from "/lib/server/ServerLogger";
import { IdleMessage } from "/lib/records/IdleMessage";
import User from "/lib/User";
import UserService from "/imports/server/service/UserService";

export default class ServerConnection extends AbstractTimestampNode {
  private userservice: UserService;

  private connectionrecord: ConnectionRecord;

  private closefunctions: (() => void)[] = [];

  private idlefunctions: ((connectionid: string, msg: IdleMessage) => void)[] =
    [];

  private logger2 = new ServerLogger(this, "server/ServerConnection");

  private user?: User;

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
    this.idlefunctions.forEach((fn) => fn(this.connectionid, idle));
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
    userservice: UserService,
  ) {
    super(parent, 60);
    this.logger2.trace(
      () => `constructor: ${JSON.stringify(connectionrecord)}`,
    );
    this.connectionrecord = connectionrecord;
    this.userservice = userservice;
    this.start();
  }

  private closing(): void {
    this.logger2.trace(() => `${this.connectionid} closing`);
    this.closefunctions.forEach((func) => func());
  }

  public onClose(func: () => void): void {
    this.logger2.trace(() => `${this.connectionid} onClose`);
    if (this.user) this.user.logoff();
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
}
