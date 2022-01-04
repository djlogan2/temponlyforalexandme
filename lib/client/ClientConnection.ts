import { Meteor } from "meteor/meteor";
import { PingMessage } from "../records/PingMessage";
import { PongMessage } from "../records/PongMessage";
import { PongResponse } from "../records/PongResponse";
import AbstractTimestampNode from "/lib/AbstractTimestampNode";
import Stoppable from "/lib/Stoppable";
import ClientLogger from "/lib/client/ClientLogger";
import { IdleMessage } from "/lib/records/IdleMessage";

export default class ClientConnection extends AbstractTimestampNode {
    private connectionid: string = "none";

    private focused: boolean = false;

    private idle: number = 0;

    private logger2 = new ClientLogger(this, "client/ClientConnection");

    private idlehandle?: number;

    constructor(parent: Stoppable | null) {
        super(parent, 60);
        // this.logger2.trace(() => "constructor");
        Meteor.startup(() => {
            // @ts-ignore
            this.connectionid = Meteor.connection._lastSessionId;
            // this.logger2.trace(() => `connection id=${this.connectionid}`);
            window.addEventListener("click", this.isActive);
            window.addEventListener("keydown", this.isActive);
            window.addEventListener("blur", () => this.isFocused(false));
            window.addEventListener("focus", () => this.isFocused(true));
            if (Meteor.isCordova) {
                document.addEventListener("pause", () => this.isFocused(false));
                document.addEventListener("resume", () => this.isFocused(true));
            }
            this.idlehandle = Meteor.setInterval(() => {
                const idle: IdleMessage = {
                    type: "idle",
                    tab: "x",
                    idleseconds: this.idle,
                    focused: this.focused,
                };
                this.sendFunction(idle);
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
        if (this.focused) this.idle = 0;
    }

    private isFocused(focused: boolean): void {
        this.focused = focused;
    }

    private onDirectMessage(messagetype: string, message: any) {
        // this.logger2.trace(() => `onDirectMessage: ${messagetype}, ${JSON.stringify(message)}`);
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
        // this.logger2.trace(() => `sendFunction msg=${JSON.stringify(msg)}`);
        // @ts-ignore
        Meteor.directStream.send(JSON.stringify({ iccdm: msg.type, iccmsg: msg }));
    }

    protected stopping() {
        super.stopping();
        if (this.idlehandle) Meteor.clearInterval(this.idlehandle);
    }
}
