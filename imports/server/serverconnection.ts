import { Mongo } from 'meteor/mongo';
import ServerICCServer from './servericcserver';
import { ConnectionRecord, ConnectionRecordSchema } from '../models/connectionrecord';
import { Timer } from '../handle';

declare const ICCServer: ServerICCServer;

export default class ServerConnection implements ConnectionRecord {
  connection_id: string;

  instance_id: string;

  create_date: Date;

  user_id?: string;

  username?: string;
}

Meteor.startup(() => {
  ICCServer.collections.connections = new Mongo.Collection<ConnectionRecord>('connections');
  // @ts-ignore
  ICCServer.collections.connections.attachSchema(ConnectionRecordSchema);

  ICCServer.onShutdown(() => {
    ICCServer.collections.connections.remove({ instance_id: ICCServer.instance_id });
    ICCServer.handles.defunctConnectionCheck.stop();
  });

  Meteor.onConnection((connection) => {
    ICCServer.collections.connections.insert({ connection_id: connection.id, create_date: new Date(), instance_id: ICCServer.instance_id });
    ICCServer.events.emit('connectionestablished', connection);
    const onclose = Meteor.bindEnvironment(() => {
      ICCServer.events.emit('connectionclosed', connection.id);
      ICCServer.collections.connections.remove({ connection_id: connection.id });
    });
    connection.onClose(onclose);
  });

  ICCServer.handles.defunctConnectionCheck = new Timer(() => {
    // @ts-ignore
    const meteor: string[] = Array.from(Meteor.server.sessions.keys());

    const ourtable: string[] = ICCServer.collections.connections.find({ instance_id: ICCServer.instance_id }, { fields: { connection_id: 1 } }).fetch().map((rec) => rec.connection_id);
    const inMeteorAndNotOurs: string[] = meteor.filter((cid) => !ourtable.some((ocid) => ocid === cid));
    const inOursAndNotMeteor: string[] = ourtable.filter((ocid) => !meteor.some((cid) => ocid === cid));

    inMeteorAndNotOurs.forEach((connectionid) => {
      ICCServer.collections.connections.insert({ instance_id: ICCServer.instance_id, connection_id: connectionid, create_date: new Date() });
      // @ts-ignore
      ICCServer.events.emit('connectionestablished', Meteor.server.session.get(connectionid));
      console.log(`Session found in meteor that we do not have! Added to our table. connection=${connectionid}`);
    });

    inOursAndNotMeteor.forEach((connectionid) => {
      console.log(`Session found in our tablel that Meteor does not have! Removing from our table. connection=${connectionid}`);
      ICCServer.events.emit('connectionclosed', connectionid);
    });
  }, 60000);
});
