import CommonTimestamp from '../commontimestamp';
import ServerICCServer from './servericcserver';
import { PingMessage, PongMessage, PongResponse } from '../models/timestamp';
import ServerDirectMessage from './serverdirectmessage';
import PingRecord from '../models/pingrecord';

declare const ICCServer: ServerICCServer;

export default class ServerTimestamp extends CommonTimestamp {
  private connectionid: string;

  private directMessage: ServerDirectMessage<PingMessage | PongMessage | PongResponse, PingMessage | PongMessage | PongResponse>;

  constructor(connectionid: string) {
    super(60);
    this.connectionid = connectionid;
  }

  private PongResponse(msg: PongResponse) {
    const record = ICCServer.collections.pingtable.findOne({ connection_id: this.connectionid });
    record.pings = record.pings.slice(0, this.pingcount - 1);
    record.pings.push(msg.delay);
    ICCServer.collections.pingtable.update({ connection_id: this.connectionid }, { $set: { pings: record.pings } });
  }

  private received(msg: PingMessage | PongMessage | PongResponse) {
    switch (msg.type) {
      case 'ping':
        this.PingReceived(msg as PingMessage);
        break;
      case 'pong':
        this.PongReceived(msg as PongMessage);
        break;
      case 'rslt':
        break;
      default:
        throw new Meteor.Error('UNKNOWN_TIMESTAMP_MESSAGE');
    }
  }

  protected sendFunction(msg: PingMessage | PongMessage | PongResponse): void {
    if (this.directMessage) this.directMessage.send(msg);
  }

  protected startReceiveWatcher(): void {
    if (this.directMessage) return;
    this.directMessage = new ServerDirectMessage('timestamp', this.connectionid, this.received);
  }

  protected stopReceiveWatcher(): void {
    this.directMessage.stop();
    delete this.directMessage;
  }
}

Meteor.startup(() => {
  ICCServer.collections.pingtable = new Mongo.Collection<PingRecord>('pingtable');
});
