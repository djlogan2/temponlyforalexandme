import EventEmitter from "eventemitter3";
import { Meteor } from "meteor/meteor";
import AbstractTimestampNode from "/lib/AbstractTimestampNode";
import Stoppable from "/lib/Stoppable";
import ClientLogger from "/lib/client/ClientLogger";
import { IdleMessage } from "/lib/records/IdleMessage";
import { Random } from "meteor/random";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import ClientUser from "/lib/client/ClientUser";
import { PingMessage } from "../records/PingMessage";
import { PongMessage } from "../records/PongMessage";
import { PongResponse } from "../records/PongResponse";

const resetEvents = {
  globalThis: [
    "onload",
    "onmousemove",
    "onmousedown",
    "ontouchstart",
    "ontouchmove",
    "onclick",
    "onkeydown",
  ],
  document: ["pause", "resume"],
};

export default class ClientConnection extends AbstractTimestampNode {
  // private readonly pConnectionid: string = "none";

  private readonly pEvents = new EventEmitter<
    "loggedin" | "loggedout" | "disconnected"
  >();

  private userdao: CommonReadOnlyUserDao;

  private focused: boolean = true;

  private idle: number = 0;

  private logger2 = new ClientLogger(this, "client/ClientConnection");

  private readonly idlehandle?: number;

  private pUser?: ClientUser;

  public get events() {
    return this.pEvents;
  }

  public get user() {
    return this.pUser;
  }

  public get connectionid() {
    return Meteor.connection._lastSessionId;
  }

  constructor(parent: Stoppable | null, userdao: CommonReadOnlyUserDao) {
    super(parent, 60);
    this.userdao = userdao;
    globalThis.connection = this;

    this.logger2.debug(() => "constructor");
    const hashToken = this.getHashToken();
    this.logger2.debug(
      () => `Calling newUserLogin with hashToken=${hashToken}`,
    );

    DDP.onReconnect(() => this.newUserLogin(hashToken));

    window.addEventListener("blur", () => this.isFocused(false));
    window.addEventListener("focus", () => this.isFocused(true));
    window.addEventListener("scroll", () => this.isActive(), true); // 'true' is required for this one!
    resetEvents.globalThis.forEach((event) =>
      window.addEventListener(event, () => this.isActive()),
    );
    resetEvents.document.forEach((event) =>
      document.addEventListener(event, () => this.isActive()),
    );

    this.idlehandle = Meteor.setInterval(() => {
      const idle: IdleMessage = {
        type: "idle",
        idleseconds: this.idle,
        focused: this.focused,
      };
      Meteor.call("idleFunction", idle);
      this.idle += 1;
    }, 1000);

    const self = this;

    function processDirectStreamMessage(
      this: { preventCallingMeteorHandler: () => void },
      message: any,
    ): void {
      try {
        const msg = JSON.parse(message);
        if (typeof msg !== "object" || !("iccdm" in msg)) return;
        self.logger2.debug(() => `processDirectStreamMessage: ${message}`);
        this.preventCallingMeteorHandler();
        self.onDirectMessage(msg.iccdm, msg.iccmsg);
      } catch (e) {
        // If we cannot parse the string into an object, it's not for us.
      }
    }

    Meteor.directStream.onMessage(processDirectStreamMessage);
    this.start();
  }

  private newUserLogin(hashToken: string): void {
    setTimeout(() => {
      Meteor.call(
        "newUserLogin",
        hashToken,
        (err: Meteor.Error, id: string) => {
          if (err) {
            this.logger2.error(() => `Call returned an error: ${err.message}`);
          } else {
            this.logger2.trace(() => `newUserLogin returns ${id}`);
            this.pUser = new ClientUser(this, id);
            globalThis.cuser = this.pUser;
            this.pEvents.emit("loggedin");
          }
        },
      );
    });
  }

  public loggedin(callback: () => void): void {
    if (this.pUser) {
      callback();
      return;
    }
    const fn = () => {
      callback();
      this.pEvents.off("loggedin", fn);
    };
    this.pEvents.on("loggedin", fn);
  }

  private isActive(): void {
    console.log("isActive called");
    if (this.focused) this.idle = 0;
  }

  private isFocused(focused: boolean): void {
    this.focused = focused;
  }

  protected PongReceived(pong: PongMessage): void {
    super.PongReceived(pong);
  }

  private onDirectMessage(messagetype: string, message: any) {
    this.logger2.debug(
      () => `onDirectMessage: ${messagetype}, ${JSON.stringify(message)}`,
    );
    switch (messagetype) {
      case "ping":
      case "pong":
      case "rslt":
        this.processIncomingMessage(message);
        break;
      default:
        throw new Meteor.Error("INVALID_MESSAGE");
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected sendFunction(
    msg: PingMessage | PongMessage | PongResponse | IdleMessage,
  ): void {
    this.logger2.debug(() => `sendFunction msg=${JSON.stringify(msg)}`);
    Meteor.directStream.send(JSON.stringify({ iccdm: msg.type, iccmsg: msg }));
  }

  public getHashToken(): string {
    let hashToken = globalThis.localStorage.getItem("ICCUser.hashToken");
    if (!hashToken) {
      hashToken = Random.secret();
      globalThis.localStorage.setItem("ICCUser.hashToken", hashToken);
    }
    return hashToken;
  }

  protected stopping() {
    super.stopping();
    if (this.idlehandle) Meteor.clearInterval(this.idlehandle);
  }
}
