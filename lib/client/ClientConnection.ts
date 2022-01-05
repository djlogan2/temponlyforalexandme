import { Meteor } from "meteor/meteor";
import { PingMessage } from "../records/PingMessage";
import { PongMessage } from "../records/PongMessage";
import { PongResponse } from "../records/PongResponse";
import AbstractTimestampNode from "/lib/AbstractTimestampNode";
import Stoppable from "/lib/Stoppable";
import ClientLogger from "/lib/client/ClientLogger";
import { IdleMessage } from "/lib/records/IdleMessage";

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

    private tabIdentifier?: string;

    private idle: number = 0;

    private logger2 = new ClientLogger(this, "client/ClientConnection");

    private idlehandle?: number;

    constructor(parent: Stoppable | null) {
        super(parent, 60);

        this.tabIdentifier = Date.now().toString();

        this.logger2.trace(() => "constructor");
        Meteor.startup(() => {
            // @ts-ignore
            this.connectionid = Meteor.connection._lastSessionId;
            this.logger2.trace(() => `connection id=${this.connectionid}`);

            window.addEventListener("blur", () => this.isFocused(false));
            window.addEventListener("focus", () => this.isFocused(true));
            window.addEventListener("scroll", () => this.isActive(), true); // 'true' is required for this one!
            resetEvents.window.forEach((event) => window.addEventListener(event, () => this.isActive()));
            resetEvents.document.forEach((event) => document.addEventListener(event, () => this.isActive()));

            this.idlehandle = Meteor.setInterval(() => {
                const idle: IdleMessage = {
                    type: "idle",
                    tab: this.tabIdentifier,
                    idleseconds: this.idle,
                    focused: this.focused,
                };
                this.sendFunction(idle);
                this.idle += 1;
            }, 1000);
        });

        const self = this;

        function processDirectStreamMessage(message: any): void {
            try {
                const msg = JSON.parse(message);
                if (typeof msg !== "object" || !("iccdm" in msg)) return;
                self.logger2.trace(() => `processDirectStreamMessage: ${message}`);
                // @ts-ignore
                // eslint-disable-next-line no-invalid-this
                this.preventCallingMeteorHandler();
                self.onDirectMessage(msg.iccdm, msg.iccmsg);
                // @ts-ignore
            } catch (e) {
                // If we cannot parse the string into an object, it's not for us.
            }
        }

        // @ts-ignore
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

    // eslint-disable-next-line class-methods-use-this
    protected sendFunction(msg: PingMessage | PongMessage | PongResponse | IdleMessage): void {
        this.logger2.trace(() => `sendFunction msg=${JSON.stringify(msg)}`);
        // @ts-ignore
        Meteor.directStream.send(JSON.stringify({ iccdm: msg.type, iccmsg: msg }));
    }

    public get getTabIdentifier(): number | undefined {
        return this.tabIdentifier;
    }

    protected stopping() {
        super.stopping();
        if (this.idlehandle) Meteor.clearInterval(this.idlehandle);
    }
}
