import { Random } from "meteor/random";
import { Meteor } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import { PingMessage } from "/lib/records/PingMessage";
import { PongMessage } from "/lib/records/PongMessage";
import { PongResponse } from "/lib/records/PongResponse";
import EventEmitter from "eventemitter3";

export default abstract class AbstractTimestampNode extends Stoppable {
  private intervalHandle?: number;

  private cleanupHandle?: number;
  private eventEmitter?: EventEmitter;

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

  private logger = global.ICCServer.utilities.getLogger(
    this,
    "AbstractTimestampNode",
  );

  protected constructor(parent: Stoppable | null, pingcount: number) {
    super(parent);
    this.pingcount = pingcount;
    this.localvalues = { current_clock_offset: 0 };
    this.remotevalues = { current_clock_offset: 0 };
    this.pendingrequests = {};

    this.eventEmitter = new EventEmitter();
  }

  protected abstract sendFunction(
    msg: PingMessage | PongMessage | PongResponse,
  ): void;

  protected PingReceived(ping: PingMessage): void {
    this.logger.trace(() => `PingReceived: ${JSON.stringify(ping)}`);
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
    this.logger.trace(() => `PongReceived: ${JSON.stringify(pong)}`);
    const arrival = this.getMilliseconds();
    this.localvalues.delay = Math.abs(
      arrival - pong.originate - (pong.transmit - pong.receive),
    );

    if (this.eventEmitter) {
      this.eventEmitter.emit("lagChanged");
    }

    this.localvalues.clock_offset =
      (pong.receive - pong.originate + pong.transmit - arrival) / 2;

    //
    // For safety, limit clock offsets to 1/4 of a second, and force timestamp to adjust
    // over time if it's really off.
    //
    if (this.localvalues.clock_offset > 250)
      this.localvalues.clock_offset = 250;
    else if (this.localvalues.clock_offset < -250)
      this.localvalues.clock_offset = -250;

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
    this.logger.trace(() => `PongResponseReceived: ${JSON.stringify(msg)}`);
    this.remotevalues.delay = msg.delay;
    this.remotevalues.clock_offset = msg.clock_offset;
    this.logger.trace(
      () =>
        `PRR localvalues=${JSON.stringify(
          this.localvalues,
        )} remotevalues=${JSON.stringify(this.remotevalues)}`,
    );
  }

  private ping(): void {
    this.logger.trace(() => "ping");
    const request: string = Random.id();
    const ping: PingMessage = {
      type: "ping",
      id: request,
      originate: this.getMilliseconds(),
    };
    this.pendingrequests[request] = ping;
    this.sendFunction(ping);
  }

  protected processIncomingMessage(
    msg: PingMessage | PongMessage | PongResponse,
  ): void {
    this.logger.trace(() => `processIncomingMessage: ${JSON.stringify(msg)}`);
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

  public getLag(): number | undefined {
    return this.localvalues.delay;
  }

  public get getEmitter(): EventEmitter | undefined {
    return this.eventEmitter;
  }

  public start(): void {
    this.logger.trace(() => "start");
    this.cleanupHandle = Meteor.setInterval(
      () => this.cleanupOldPings(),
      30000,
    ); // Every 30s
    this.intervalHandle = Meteor.setInterval(() => {
      this.ping();
    }, 1000);
  }

  protected stopping(): void {
    this.logger.trace(() => "stopping");
    if (this.intervalHandle) Meteor.clearInterval(this.intervalHandle);
    if (this.cleanupHandle) Meteor.clearInterval(this.cleanupHandle);
    delete this.intervalHandle;
    delete this.cleanupHandle;
  }
}
