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

export default class ServerConnection extends AbstractTimestampNode {
  private connectionrecord: ConnectionRecord;

  private closefunctions: (() => void)[] = [];

  private logger2 = new ServerLogger(this, "server/ServerConnection");

  private user?: User;

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
    this.logger2.debug(() => `idle=${JSON.stringify(idle)}`);
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

  constructor(parent: Stoppable | null, connectionrecord: ConnectionRecord) {
    super(parent, 60);
    this.logger2.trace(
      () => `constructor: ${JSON.stringify(connectionrecord)}`,
    );
    this.connectionrecord = connectionrecord;
    this.start();
  }

  private closing(): void {
    this.logger2.debug(() => `${this.connectionid} closing`);
    this.closefunctions.forEach((func) => func());
  }

  public onClose(func: () => void): void {
    this.logger2.debug(() => `${this.connectionid} onClose`);
    if (this.user) this.user.logoff();
    this.closefunctions.push(func);
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

  public logonUser(user: User): void {
    this.user = user;
  }
}
