import CommonTimestamp from './commontimestamp';
import { PingMessage, PongMessage, PongResponse } from './models/timestamp';
import CommonDirectMessage from './commondirectmessage';

export default abstract class CommonDirectTimestamp extends CommonTimestamp {
  protected directMessage: CommonDirectMessage<PingMessage | PongMessage | PongResponse, PingMessage | PongMessage | PongResponse>;

  protected abstract startReceiveWatcher(): void;

  protected stopReceiveWatcher(): void {
    this.directMessage.stop();
    delete this.directMessage;
  }

  protected sendFunction(msg: PingMessage | PongMessage | PongResponse): void {
    if (this.directMessage) this.directMessage.send(msg);
  }
}
