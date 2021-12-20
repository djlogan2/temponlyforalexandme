import AbstractDirectMessageHandler from "/lib/AbstractDirectMessageHandler";
import { PingMessage } from "/lib/records/PingMessage";
import { PongMessage } from "/lib/records/PongMessage";
import { PongResponse } from "/lib/records/PongResponse";

export interface TimestampHandler {
    onPing(ping: PingMessage): void;
    onPong(pong: PongMessage): void;
    onPongResponse(response: PongResponse): void;
}

export default class TimestampDirectMessageHandler extends AbstractDirectMessageHandler<PingMessage | PongMessage | PongResponse> {
    private handler: TimestampHandler;

    constructor(handler: TimestampHandler, connectionid: string) {
        super(`timestamp:${connectionid}`, connectionid);
        this.handler = handler;
    }

    public onReceived(msg: PingMessage | PongMessage | PongResponse): void {
        switch (msg.type) {
        case "ping":
            this.handler.onPing(msg);
            break;
        case "pong":
            this.handler.onPong(msg);
            break;
        case "rslt":
            this.handler.onPongResponse(msg);
        }
    }
}
