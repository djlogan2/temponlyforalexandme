import ConnectionRecord from "/lib/records/ConnectionRecord";
import Stoppable from "/lib/Stoppable";
import AbstractTimestampNode from "../AbstractTimestampNode";
import { PingMessage } from "../records/PingMessage";
import { PongMessage } from "../records/PongMessage";
import { PongResponse } from "../records/PongResponse";
import { Meteor } from "meteor/meteor";

export default class ServerConnection extends AbstractTimestampNode {
    private connectionrecord: ConnectionRecord;

    private closefunctions: (() => void)[] = [];

    public get _id(): string {
        return this.connectionrecord._id;
    }

    public get connectionid(): string {
        return this.connectionrecord.connectionid;
    }

    protected stopping(): void {
        this.closing();
    }

    public handleDirectMessage(messagetype: string, message: any) {
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
        this.connectionrecord = connectionrecord;
    }

    public closing(): void {
        this.closefunctions.forEach((func) => func());
    }

    public onClose(func: () => void): void {
        this.closefunctions.push(func);
    }

    protected sendFunction(msg: PingMessage | PongMessage | PongResponse): void {
        // @ts-ignore
        Meteor.directStream.send(JSON.stringify({ iccdm: this.name, iccmsg: msg }), this.connectionid);
    }

    protected startReceiveWatcher(): void {
        // Not necessary
    }

    protected stopReceiveWatcher(): void {
        // Not necessary
    }
}
