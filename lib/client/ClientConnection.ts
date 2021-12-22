import { Meteor } from "meteor/meteor";
import { PingMessage } from "../records/PingMessage";
import { PongMessage } from "../records/PongMessage";
import { PongResponse } from "../records/PongResponse";
import AbstractTimestampNode from "/lib/AbstractTimestampNode";
import Stoppable from "/lib/Stoppable";
import ClientLogger from "/lib/client/ClientLogger";

export default class ClientConnection extends AbstractTimestampNode {
    private connectionid: string = "none";
    private logger = new ClientLogger("client/ClientConnection");

    constructor(parent: Stoppable | null) {
        super(parent, 60);
        Meteor.startup(() => {
            // @ts-ignore
            this.connectionid = Meteor.connection._lastSessionId;
            this.logger.error(() => "Hey mr client!");
        });

        const self = this;

        function processDirectStreamMessage(message: any): void {
            try {
                const msg = JSON.parse(message);
                if (typeof msg !== "object" || !("iccdm" in msg)) return;
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
    }

    private onDirectMessage(messagetype: string, message: any) {
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
        // @ts-ignore
        Meteor.directStream.send(JSON.stringify({ iccdm: msg.type, iccmsg: msg }));
    }

    // @ts-ignore
    // eslint-disable-next-line class-methods-use-this
    protected startReceiveWatcher(): void {
        // handled via directstream
    }

    // @ts-ignore
    // eslint-disable-next-line class-methods-use-this
    protected stopReceiveWatcher(): void {
        // handled via directstream, so no need
    }
}
