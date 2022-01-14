import { Meteor } from "meteor/meteor";
import AbstractTimestampNode from "/lib/AbstractTimestampNode";
import Stoppable from "/lib/Stoppable";
import ClientLogger from "/lib/client/ClientLogger";
import { IdleMessage } from "/lib/records/IdleMessage";
import { Random } from "meteor/random";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import CommonReadOnlyThemeDao from "/imports/dao/CommonReadOnlyThemeDao";
import ClientUser from "/lib/client/ClientUser";
import ClientTheme from "/lib/client/ClientTheme";
import EventEmitter from "eventemitter3";
import CommonReadOnlyI18nDao from "../../imports/dao/CommonReadOnlyI18nDao";
import ClientI18nRecord from "../records/ClientI18nRecord";
import { PingMessage } from "../records/PingMessage";
import { PongMessage } from "../records/PongMessage";
import { PongResponse } from "../records/PongResponse";
import ThemeRecord, { EThemesEnum } from "../records/ThemeRecord";
import { THEME_STORAGE_KEY } from "/imports/themes/light";
import ClientI18n from "./ClientI18n";

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
  private pConnectionid: string = "none";

  private userdao: CommonReadOnlyUserDao;

  private themedao: CommonReadOnlyThemeDao;

  private i18ndao: CommonReadOnlyI18nDao;

  private focused: boolean = true;

  private idle: number = 0;

  private logger2 = new ClientLogger(this, "client/ClientConnection");

  private idlehandle?: number;

  private user?: ClientUser;

  private _theme: ClientTheme = new ClientTheme(
    this,
    localStorage.getItem(THEME_STORAGE_KEY) as EThemesEnum,
  );

  private _i18n: ClientI18n = new ClientI18n(
    this,
    this.user?.locale || "en-US",
  );

  private eventemitter = new EventEmitter();

  public get connectionid() {
    return this.pConnectionid;
  }

  public getTheme(themeType: EThemesEnum) {
    return this.themedao.readOne({ "theme.type": themeType });
  }

  public getI18n(locale: string) {
    return this.i18ndao.readOne({ locale });
  }

  public get theme() {
    return this._theme;
  }

  constructor(
    parent: Stoppable | null,
    userdao: CommonReadOnlyUserDao,
    themedao: CommonReadOnlyThemeDao,
    i18ndao: CommonReadOnlyI18nDao,
  ) {
    super(parent, 60);
    this.userdao = userdao;
    this.themedao = themedao;
    this.i18ndao = i18ndao;
    globalThis.connection = this;

    this.logger2.trace(() => "constructor");
    Meteor.startup(() => {
      this.pConnectionid = Meteor.connection._lastSessionId;

      const hashToken = this.getHashToken();
      this.logger2.debug(
        () => `Calling newUserLogin with hashToken=${hashToken}`,
      );
      Meteor.call(
        "newUserLogin",
        hashToken,
        (err: Meteor.Error, id: string) => {
          if (err) {
            this.logger2.error(() => `Call returned an error: ${err.message}`);
          } else {
            this.logger2.debug(() => `newUserLogin returns ${id}`);
            this.user = new ClientUser(this, id);
            globalThis.user = this.user;
            this.eventemitter.emit("loggedin");
          }
        },
      );

      this.logger2.debug(() => `connection id=${this.pConnectionid}`);

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
    });

    const self = this;

    function processDirectStreamMessage(
      this: { preventCallingMeteorHandler: () => void },
      message: any,
    ): void {
      try {
        const msg = JSON.parse(message);
        if (typeof msg !== "object" || !("iccdm" in msg)) return;
        self.logger2.trace(() => `processDirectStreamMessage: ${message}`);
        this.preventCallingMeteorHandler();
        self.onDirectMessage(msg.iccdm, msg.iccmsg);
      } catch (e) {
        // If we cannot parse the string into an object, it's not for us.
      }
    }

    Meteor.directStream.onMessage(processDirectStreamMessage);
    this.start();
  }

  private isActive(): void {
    console.log("isActive called");
    if (this.focused) this.idle = 0;
  }

  private isFocused(focused: boolean): void {
    this.focused = focused;
  }

  // TODO: FYI Alex, I would prefer you do it this way. I really don't want an eventemitter in AbstractTimestampNode,
  //       because that class is used on the server as well as the client.
  //       For client emitters, I think we should have them at this level.
  //       I don't see any code that uses this anymore, so maybe you need to either fix that or take this out,
  //       but in the meantime I would prefer to make sure event emitters the client needs are defined only
  //       on the client, and only moved down if the server has a similar need.

  public get events() {
    return this.eventemitter;
  }

  protected PongReceived(pong: PongMessage): void {
    super.PongReceived(pong);
    this.eventemitter.emit("lagchanged", this.localvalues.delay);
  }

  private onDirectMessage(messagetype: string, message: any) {
    this.logger2.trace(
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
    this.logger2.trace(() => `sendFunction msg=${JSON.stringify(msg)}`);
    Meteor.directStream.send(JSON.stringify({ iccdm: msg.type, iccmsg: msg }));
  }

  // eslint-disable-next-line class-methods-use-this
  public getHashToken(): string | undefined {
    let hashToken = globalThis.localStorage.getItem("ICCUser.hashToken");
    if (!hashToken) {
      hashToken = Random.secret();
      globalThis.localStorage.setItem("ICCUser.hashToken", hashToken);
    }
    return hashToken;
  }

  public changeTheme(theme: EThemesEnum): void {
    const item = localStorage.getItem(THEME_STORAGE_KEY);
    if (item === theme) {
      return;
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme);
    this._theme.changeTheme(theme);
  }

  public subscribeToThemes(cb: (data: ThemeRecord) => void) {
    this._theme.events.on("themes", (data: ThemeRecord) => {
      if (data) {
        cb(data);
      }
    });
  }

  public subscribeToI18n(cb: (data: ClientI18nRecord) => void) {
    this._i18n.events.on("i18n", (data: ClientI18nRecord) => {
      if (data) {
        cb(data);
      }
    });
  }

  protected stopping() {
    super.stopping();
    if (this.idlehandle) Meteor.clearInterval(this.idlehandle);
  }
}
