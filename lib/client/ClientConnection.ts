import { Meteor } from "meteor/meteor";
import { PingMessage } from "../records/PingMessage";
import { PongMessage } from "../records/PongMessage";
import { PongResponse } from "../records/PongResponse";
import AbstractTimestampNode from "/lib/AbstractTimestampNode";
import Stoppable from "/lib/Stoppable";
import ClientLogger from "/lib/client/ClientLogger";
import { IdleMessage } from "/lib/records/IdleMessage";
import { Random } from "meteor/random";

//
// The idle monitor
//       this listeners below...should technically already be working! We just need to make sure
//       and fix any bugs if we have any
//       ALEX: So as of now, the focused/not focused works, but none of the other events are being fired. I do not yet know why.
//
// "hash token"
//   When a connection is established, we obviously already get the "connection id" for the websocket
//       I need some type of "hash token" that gets generated when a user connects for the first time,
//          and then resuse this when they come back (i.e. from a cookie or localstorage or whatever)
//     Even though this guy is anonymous, I want the server to know him as the "same" anonymous guy forever.
//        (We will use this later to implement auto-login or remember me services)
// The "tab" id
//     The client to be able to create some type of random string, key, random set bytes, hash, something for each tab,
//     so that we can differentiate between tabs
//
//    hashtoken           "tab token"
//     2psdvkwp0459tw     roguse0-rg9wreg
//     2psdvkwp0459tw     3456934856
//     2psdvkwp0459tw     450974
//
// "Architecture"
//     Get an instance of "ClientConnection" saved somewhere
//     Decide how to extenalize data and methods for the components
//
//   In order to display my current lag, what I would display is localvalues.delay (or remotevalues.delay) <-- 56ms
//

const resetEvents = {
    window: ["onload", "onmousemove", "onmousedown", "ontouchstart", "ontouchmove", "onclick", "onkeydown"],
    document: ["pause", "resume"],
};

export default class ClientConnection extends AbstractTimestampNode {
    private connectionid: string = "none";

    private focused: boolean = true;

    private idle: number = 0;

    private logger2 = new ClientLogger(this, "client/ClientConnection");

    private idlehandle?: number;

    constructor(parent: Stoppable | null) {
        super(parent, 60);

        this.logger2.trace(() => "constructor");
        Meteor.startup(() => {
            this.connectionid = Meteor.connection._lastSessionId;

            const hashToken = this.getHashToken();

            this.logger2.trace(() => `connection id=${this.connectionid}`);

            window.addEventListener("blur", () => this.isFocused(false));
            window.addEventListener("focus", () => this.isFocused(true));
            window.addEventListener("scroll", () => this.isActive(), true); // 'true' is required for this one!
            resetEvents.window.forEach((event) => window.addEventListener(event, () => this.isActive()));
            resetEvents.document.forEach((event) => document.addEventListener(event, () => this.isActive()));

            this.idlehandle = Meteor.setInterval(() => {
                const idle: IdleMessage = {
                    type: "idle",
                    idleseconds: this.idle,
                    focused: this.focused,
                };
                Meteor.call("idleFunction", idle);
                this.idle += 1;
            }, 1000);
            Meteor.call("logonHashToken", hashToken);
        });

        const self = this;

        Meteor.directStream.onMessage(function processDirectStreamMessage(message: any): void {
          try {
              const msg = JSON.parse(message);
              if (typeof msg !== "object" || !("iccdm" in msg)) return;
              self.logger2.trace(() => `processDirectStreamMessage: ${message}`);
              this.preventCallingMeteorHandler();
              self.onDirectMessage(msg.iccdm, msg.iccmsg);
          } catch (e) {
              // If we cannot parse the string into an object, it's not for us.
          }
      });
        this.start();
    }

    private isActive(): void {
        console.log("isActive called");
        if (this.focused) this.idle = 0;
    }

    private isFocused(focused: boolean): void {
        this.focused = focused;
    }

    private onDirectMessage(messagetype: string, message: any) {
        this.logger2.trace(() => `onDirectMessage: ${messagetype}, ${JSON.stringify(message)}`);
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

    protected sendFunction(msg: PingMessage | PongMessage | PongResponse | IdleMessage): void {
        this.logger2.trace(() => `sendFunction msg=${JSON.stringify(msg)}`);
        Meteor.directStream.send(JSON.stringify({ iccdm: msg.type, iccmsg: msg }));
    }

    public getHashToken(): string | undefined {
        let hashToken = window.localStorage.getItem("ICCUser.hashToken");
        if(!hashToken) {
            hashToken = Random.secret();
            window.localStorage.setItem("ICCUser.hashToken", hashToken);
        }
        return hashToken;
    }

    protected stopping() {
        super.stopping();
        if (this.idlehandle) Meteor.clearInterval(this.idlehandle);
    }
    
    // TODO These should be probably implemented
    get getTabIdentifier() {
      return 0;
    }

    public getConnectionFromCookie() {
      return 0;
    }
}
