import CommonTimestamp from './commontimestamp';
import { PingMessage, PongMessage, PongResponse } from './models/timestamp';
import CommonDirectMessage from './commondirectmessage';
import CommonLogger from './commonlogger';
import CommonICCServer from './commoniccserver';

declare const ICCServer: CommonICCServer;

export default abstract class CommonDirectTimestamp extends CommonTimestamp {
  private commonlogger2: CommonLogger;

  constructor(pingcount: number) {
    super(pingcount);
    this.commonlogger2 = ICCServer.createLogger('common/CommonDirectTimestamp');
    this.commonlogger2.debug(() => 'CommonDirectTimestamp.constructor');
  }

  protected directMessage: CommonDirectMessage<PingMessage | PongMessage | PongResponse, PingMessage | PongMessage | PongResponse>;

  protected abstract startReceiveWatcher(): void;

  protected stopReceiveWatcher(): void {
    this.commonlogger2.debug(() => 'CommonDirectTimestamp.stopReceiveWatcher');
    this.directMessage.stop();
    delete this.directMessage;
  }

  protected sendFunction(msg: PingMessage | PongMessage | PongResponse): void {
    this.commonlogger2.debug(() => `CommonDirectTimestamp.sendFunction msg=${JSON.stringify(msg)}`);
    if (this.directMessage) this.directMessage.send(msg);
  }
}
