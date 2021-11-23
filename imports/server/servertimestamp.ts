import ServerICCServer from './servericcserver';
import { PongMessage, PongResponse } from '../models/timestamp';
import PingRecord from '../models/pingrecord';
import CommonDirectTimestamp from '../commondirecttimetamp';
import ServerDirectMessage from './serverdirectmessage';
import ServerLogger from './serverlogger';

declare const ICCServer: ServerICCServer;

export default class ServerTimestamp extends CommonDirectTimestamp {
  private logger: ServerLogger = new ServerLogger('server/ServerTimestamp');

  private connectionid: string;

  constructor(pingcount: number, connectionid: string) {
    super(pingcount);
    this.connectionid = connectionid;
  }

  protected PongReceived(pong: PongMessage) {
    super.PongReceived(pong);
    this.logger.debug(() => `ServerTimestamp.PongReceived: ${JSON.stringify(pong)}`);
    ICCServer.collections.pingtable.upsert({ connection_id: this.connectionid }, {
      connection_id: this.connectionid,
      lastPing: new Date(),
      pendingrequests: this.pendingrequests,
      localvalues: this.localvalues,
      remotevalues: this.remotevalues,
      pingcount: this.pingcount,
      pingtimes: this.pingtimes,
    });
  }

  protected PongResponseReceived(msg: PongResponse) {
    super.PongResponseReceived(msg);
    this.logger.debug(() => `ServerTimestamp.PongResponseReceived: ${JSON.stringify(msg)}`);
  }

  protected startReceiveWatcher(): void {
    this.logger.debug(() => 'ServerTimestamp.startReceiveWatcher');
    if (this.directMessage) return;
    this.directMessage = new ServerDirectMessage('timestamp', this.connectionid, (msg) => this.processIncomingMessage(msg));
  }
}

Meteor.startup(() => {
  ICCServer.collections.pingtable = new Mongo.Collection<PingRecord>('pingtable');
  ICCServer.events.on('connectionestablished', (connection) => {
    const timestamp = new ServerTimestamp(60, connection.id);
    ICCServer.timestamp[connection.id] = timestamp;
    timestamp.start();
  });

  ICCServer.events.on('connectionclosed', (connectionid) => {
    const timestamp = ICCServer.timestamp[connectionid];
    timestamp.stop();
    delete ICCServer.timestamp[connectionid];
  });
});
