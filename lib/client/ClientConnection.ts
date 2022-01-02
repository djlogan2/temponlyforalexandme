import { Meteor } from "meteor/meteor";
import { PingMessage } from "../records/PingMessage";
import { PongMessage } from "../records/PongMessage";
import { PongResponse } from "../records/PongResponse";
import AbstractTimestampNode from "/lib/AbstractTimestampNode";
import Stoppable from "/lib/Stoppable";
import ClientLogger from "/lib/client/ClientLogger";

export default class ClientConnection extends AbstractTimestampNode {
    private connectionid: string = "none";

    private logger2 = new ClientLogger(this, "client/ClientConnection");

    constructor(parent: Stoppable | null) {
        super(parent, 60);
        this.logger2.trace(() => "constructor");
        Meteor.startup(() => {
            // @ts-ignore
            this.connectionid = Meteor.connection._lastSessionId;
            this.logger2.trace(() => `connection id=${this.connectionid}`);
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
    protected sendFunction(msg: PingMessage | PongMessage | PongResponse): void {
        this.logger2.trace(() => `sendFunction msg=${JSON.stringify(msg)}`);
        // @ts-ignore
        Meteor.directStream.send(JSON.stringify({ iccdm: msg.type, iccmsg: msg }));
    }
}
