import { Meteor } from 'meteor/meteor';
import ServerICCServer from './servericcserver';
import { PongMessage, PongResponse } from '../models/timestamp';
import PingRecord from '../models/pingrecord';
import CommonDirectTimestamp from '../commondirecttimetamp';
import ServerDirectMessage from './serverdirectmessage';

declare const ICCServer: ServerICCServer;

export default class ServerTimestamp extends CommonDirectTimestamp {
  private connectionid: string;

  constructor(pingcount: number, connectionid: string) {
    super(pingcount);
    this.connectionid = connectionid;
  }

  protected PongReceived(pong: PongMessage) {
    super.PongReceived(pong);
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

  protected startReceiveWatcher(): void {
    if (this.directMessage) return;
    this.directMessage = new ServerDirectMessage('timestamp', this.connectionid, (msg) => this.processIncomingMessage(msg));
  }
}

Meteor.startup(() => {
  ICCServer.collections.pingtable = new Mongo.Collection<PingRecord>('pingtable');

  const pingtablerecords = ICCServer.collections.pingtable.find({}, { fields: { connection_id: 1 } }).fetch();
  const connectionrecords = ICCServer.collections.connections.find({}, { fields: { connection_id: 1 } }).fetch();

  const cleanup = pingtablerecords.filter((rec) => !connectionrecords.some((cr) => cr.connection_id === rec.connection_id)).map((rec2) => rec2._id);
  if (cleanup && cleanup.length) ICCServer.collections.pingtable.remove({ _id: { $in: cleanup } });

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

  ICCServer.events.on('defunctconnection', (connectionid) => {
    ICCServer.collections.pingtable.remove({ connection_id: connectionid });
  });
});
