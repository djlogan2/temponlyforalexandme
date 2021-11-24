import { Mongo } from 'meteor/mongo';
import ServerICCServer from './servericcserver';
import { ConnectionRecord, ConnectionRecordSchema } from '../models/connectionrecord';
import { Handle, Timer } from '../handle';
import { RemoteInstance } from '../commoninstance';
import ServerLogger from './serverlogger';

let defunctConnectionCheck: Handle;

declare const ICCServer: ServerICCServer;

export default class ServerConnection implements ConnectionRecord {
  public _id: string;

  public static logger: ServerLogger = new ServerLogger('server/ServerConnection');

  public connection_id: string;

  public instance_id: string;

  public create_date: Date;

  public clientAddress: string;

  public user_id?: string;

  public username?: string;
}

Meteor.startup(() => {
  ICCServer.collections.connections = new Mongo.Collection<ConnectionRecord>('connections');
  // @ts-ignore
  ICCServer.collections.connections.attachSchema(ConnectionRecordSchema);

  ICCServer.onShutdown(() => {
    ICCServer.collections.connections.remove({ instance_id: ICCServer.instance_id });
    defunctConnectionCheck.stop();
  });

  Meteor.onConnection((connection) => {
    ICCServer.collections.connections.insert({
      connection_id: connection.id, create_date: new Date(), instance_id: ICCServer.instance_id, clientAddress: connection.clientAddress,
    });
    ICCServer.events.emit('connectionestablished', connection);
    const onclose = Meteor.bindEnvironment(() => {
      ICCServer.events.emit('connectionclosed', connection.id);
      ICCServer.collections.connections.remove({ connection_id: connection.id });
    });
    connection.onClose(onclose);
  });

  ICCServer.events.on('defunctinstance', (inst: RemoteInstance) => {
    ICCServer.collections.connections.update({ instance_id: inst._id, handlingInstance: { $exists: false } }, { $set: { handlingInstance: ICCServer.instance_id } });
    ICCServer.collections.connections.find({ handlingInstance: ICCServer.instance_id }).forEach((connection: ConnectionRecord) => {
      ServerConnection.logger.error(() => `Session found for a defunct instance! Removing from our table. connection=${connection.connection_id}`);
      ICCServer.events.emit('defunctconnection', connection.connection_id);
      ICCServer.collections.connections.remove({ _id: connection._id });
    });
  });

  defunctConnectionCheck = new Timer(() => {
    // @ts-ignore
    const meteor: string[] = Array.from(Meteor.server.sessions.keys());

    const ourtable: string[] = ICCServer.collections.connections.find({ instance_id: ICCServer.instance_id }, { fields: { connection_id: 1 } }).fetch().map((rec) => rec.connection_id);
    const inMeteorAndNotOurs: string[] = meteor.filter((cid) => !ourtable.some((ocid) => ocid === cid));
    const inOursAndNotMeteor: string[] = ourtable.filter((ocid) => !meteor.some((cid) => ocid === cid));

    inMeteorAndNotOurs.forEach((connectionid) => {
      // @ts-ignore
      const connection = Meteor.server.sessions.get(connectionid);
      ICCServer.collections.connections.insert({
        instance_id: ICCServer.instance_id, connection_id: connectionid, create_date: new Date(), clientAddress: connection.clientAddress,
      });
      // @ts-ignore
      ICCServer.events.emit('connectionestablished', Meteor.server.session.get(connectionid));
      ServerConnection.logger.error(() => `Session found in meteor that we do not have! Added to our table. connection=${connectionid}`);
    });

    inOursAndNotMeteor.forEach((connectionid) => {
      ServerConnection.logger.error(() => `Session found in our table that Meteor does not have! Removing from our table. connection=${connectionid}`);
      ICCServer.events.emit('defunctconnection', connectionid);
    });
  }, 1000);
});
