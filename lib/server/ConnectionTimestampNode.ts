import AbstractTimestampNode from "/lib/AbstractTimestampNode";
import { PingMessage } from "/lib/records/PingMessage";
import { PongMessage } from "/lib/records/PongMessage";
import { PongResponse } from "/lib/records/PongResponse";

export default class ConnectionTimestampNode extends AbstractTimestampNode {
    protected sendFunction(msg: PingMessage | PongMessage | PongResponse): void {
        throw new Error("Method not implemented.");
    }
    protected startReceiveWatcher(): void {
        throw new Error("Method not implemented.");
    }
    protected stopReceiveWatcher(): void {
        throw new Error("Method not implemented.");
    }

}
