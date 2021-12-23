import { Random } from "meteor/random";
import { Meteor } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import { PingMessage } from "/lib/records/PingMessage";
import { PongMessage } from "/lib/records/PongMessage";
import { PongResponse } from "/lib/records/PongResponse";
import CommonLogger from "/lib/CommonLogger";

export default abstract class AbstractTimestampNode extends Stoppable {
    private intervalHandle?: number;

    private cleanupHandle?: number;

    protected pendingrequests: { [key: string]: PingMessage };

    protected localvalues: {
        current_clock_offset: number;
        delay?: number;
        clock_offset?: number;
    };

    protected remotevalues: {
        current_clock_offset: number;
        delay?: number;
        clock_offset?: number;
    };

    protected pingcount: number;

    protected pingtimes: number[] = [];

    private logger = CommonLogger.getLogger("AbstractTimestampNode");

    protected constructor(parent: Stoppable | null, pingcount: number) {
        super(parent);
        this.pingcount = pingcount;
        this.localvalues = { current_clock_offset: 0 };
        this.remotevalues = { current_clock_offset: 0 };
        this.pendingrequests = {};
    }

    // eslint-disable-next-line no-unused-vars
    protected abstract sendFunction(msg: PingMessage | PongMessage | PongResponse): void;

    protected PingReceived(ping: PingMessage): void {
        this.logger.debug(() => `PingReceived: ${JSON.stringify(ping)}`);
        const pong: PongMessage = {
            type: "pong",
            id: ping.id,
            originate: ping.originate,
            receive: new Date().getTime(), // When the packet came in
            transmit: new Date().getTime(), // When the packet gets sent out
        };
        this.sendFunction(pong);
    }

    protected PongReceived(pong: PongMessage): void {
        this.logger.debug(() => `PongReceived: ${JSON.stringify(pong)}`);
        const arrival = this.getMilliseconds();
        this.localvalues.delay = Math.abs(arrival - pong.originate - (pong.transmit - pong.receive));
        this.localvalues.clock_offset = (pong.receive - pong.originate + pong.transmit - arrival) / 2;

        //
        // For safety, limit clock offsets to 1/4 of a second, and force timestamp to adjust
        // over time if it's really off.
        //
        if (this.localvalues.clock_offset > 250) this.localvalues.clock_offset = 250;
        else if (this.localvalues.clock_offset < -250) this.localvalues.clock_offset = -250;

        this.localvalues.current_clock_offset += this.localvalues.clock_offset;

        if (this.pingtimes.length >= this.pingcount) this.pingtimes.shift();
        this.pingtimes.push(this.localvalues.delay);
        const pongresponse: PongResponse = {
            type: "rslt",
            id: pong.id,
            delay: this.localvalues.delay,
            clock_offset: this.localvalues.clock_offset,
        };
        this.sendFunction(pongresponse);
        delete this.pendingrequests[pong.id];
    }

    protected PongResponseReceived(msg: PongResponse) {
        this.logger.debug(() => `PongResponseReceived: ${JSON.stringify(msg)}`);
        this.remotevalues.delay = msg.delay;
        this.remotevalues.clock_offset = msg.clock_offset;
    }

    private ping(): void {
        this.logger.debug(() => "ping");
        const request: string = Random.id();
        const ping: PingMessage = {
            type: "ping",
            id: request,
            originate: this.getMilliseconds(),
        };
        this.pendingrequests[request] = ping;
        this.sendFunction(ping);
    }

    protected processIncomingMessage(msg: PingMessage | PongMessage | PongResponse): void {
        this.logger.debug(() => `processIncomingMessage: ${JSON.stringify(msg)}`);
        switch (msg.type) {
        case "ping":
            this.PingReceived(msg as PingMessage);
            break;
        case "pong":
            this.PongReceived(msg as PongMessage);
            break;
        case "rslt":
            this.PongResponseReceived(msg as PongResponse);
            break;
        default:
            throw new Meteor.Error("UNKNOWN_TIMESTAMP_MESSAGE");
        }
    }

    private cleanupOldPings(): void {
        const old = new Date().getTime() - 60 * 1000; // One minute ago
        Object.keys(this.pendingrequests)
            .filter((key) => this.pendingrequests[key].originate < old)
            .forEach((key) => {
                delete this.pendingrequests[key];
            });
    }

    public getMilliseconds(): number {
        return new Date().getTime() + this.localvalues.current_clock_offset;
    }

    public start(): void {
        this.cleanupHandle = Meteor.setInterval(() => this.cleanupOldPings(), 30000); // Every 30s
        this.intervalHandle = Meteor.setInterval(() => {
            this.ping();
        }, 1000);
    }

    protected stopping(): void {
        if (this.intervalHandle) Meteor.clearInterval(this.intervalHandle);
        if (this.cleanupHandle) Meteor.clearInterval(this.cleanupHandle);
        delete this.intervalHandle;
        delete this.cleanupHandle;
    }
}
