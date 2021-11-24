import { Random } from 'meteor/random';
import { PingMessage, PongMessage, PongResponse } from './models/timestamp';
import CommonLogger from './commonlogger';
import CommonICCServer from './commoniccserver';

declare const ICCServer: CommonICCServer;

export default abstract class CommonTimestamp {
  private commonlogger: CommonLogger;

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

  constructor(pingcount: number) {
    this.commonlogger = ICCServer.createLogger('common/CommonTimestamp');
    this.pingcount = pingcount;
    this.localvalues = { current_clock_offset: 0 };
    this.remotevalues = { current_clock_offset: 0 };
    this.pendingrequests = {};
  }

  protected abstract sendFunction(msg: PingMessage | PongMessage | PongResponse): void;

  protected abstract startReceiveWatcher(): void;

  protected abstract stopReceiveWatcher(): void;

  protected PingReceived(ping: PingMessage): void {
    const pong: PongMessage = {
      type: 'pong',
      id: ping.id,
      originate: ping.originate,
      receive: new Date().getTime(), // When the packet came in
      transmit: new Date().getTime(), // When the packet gets sent out
    };
    this.sendFunction(pong);
  }

  protected PongReceived(pong: PongMessage): void {
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
      type: 'rslt',
      id: pong.id,
      delay: this.localvalues.delay,
      clock_offset: this.localvalues.clock_offset,
    };
    this.sendFunction(pongresponse);
    delete this.pendingrequests[pong.id];
    this.commonlogger.debug(() => `pong received: ${JSON.stringify(pong)}`);
  }

  protected PongResponseReceived(msg: PongResponse) {
    this.remotevalues.delay = msg.delay;
    this.remotevalues.clock_offset = msg.clock_offset;
  }

  public shouldSendPing: boolean = true;

  private ping(): void {
    if (!this.shouldSendPing) return;
    const request: string = Random.id();
    const ping: PingMessage = {
      type: 'ping',
      id: request,
      originate: this.getMilliseconds(),
    };
    this.pendingrequests[request] = ping;
    this.sendFunction(ping);
  }

  protected processIncomingMessage(msg: PingMessage | PongMessage | PongResponse): void {
    switch (msg.type) {
      case 'ping':
        this.PingReceived(msg as PingMessage);
        break;
      case 'pong':
        this.PongReceived(msg as PongMessage);
        break;
      case 'rslt':
        this.PongResponseReceived(msg as PongResponse);
        break;
      default:
        throw new Meteor.Error('UNKNOWN_TIMESTAMP_MESSAGE');
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
    this.startReceiveWatcher();
    this.cleanupHandle = Meteor.setInterval(() => this.cleanupOldPings(), 30000); // Every 30s
    this.intervalHandle = Meteor.setInterval(() => {
      this.ping();
    }, 1000);
  }

  public stop(): void {
    if (this.intervalHandle) Meteor.clearInterval(this.intervalHandle);
    if (this.cleanupHandle) Meteor.clearInterval(this.cleanupHandle);
    delete this.intervalHandle;
    delete this.cleanupHandle;
    this.stopReceiveWatcher();
  }
}
