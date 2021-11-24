import CommonDirectMessage from '../commondirectmessage';
import ServerICCServer from './servericcserver';
import ServerLogger from './serverlogger';

declare const ICCServer: ServerICCServer;

export default class ServerDirectMessage<S, R> extends CommonDirectMessage<S, R> {
  public static logger: ServerLogger = new ServerLogger('server/ServerDirectMessages');

  private connection_id: string;

  stop(): void {
    ServerDirectMessage.logger.debug(() => `ServerDirectMessage.stop, name=${this.name}, connection=${this.connection_id}`);
    ServerDirectMessage.stopConnection(this.connection_id, this.name);
  }

  private static registered: { [key: string]: { [key: string]: any } } = {};

  constructor(name: string, connectionId: string, handler?: (msg: R) => void) {
    super(name, handler);
    this.connection_id = connectionId;
    if (!ServerDirectMessage.registered[connectionId]) ServerDirectMessage.registered[connectionId] = {};
    if (ServerDirectMessage.registered[connectionId][name]) throw new Meteor.Error('ALREADY_REGISTERED');
    ServerDirectMessage.registered[connectionId][name] = this;
  }

  public static globalreceive(connectionid: string, name: string, msg: any) {
    ServerDirectMessage.logger.debug(() => `ServerDirectMessage.globalReceive, name=${name}, msg=${JSON.stringify(msg)}`);
    const c = ServerDirectMessage.registered[connectionid];
    if (!c) throw new Meteor.Error('CONNECTION_NOT_FOUND');
    const clazz = c[name];
    if (!clazz) throw new Meteor.Error('MESSAGE_TYPE_NOT_FOUND');
    clazz.received(msg);
  }

  public static stopConnection(connectionid: string, name?: string): void {
    ServerDirectMessage.logger.debug(() => `ServerDirectMessage.stopConnection, name=${name}, connection=${connectionid}`);
    if (!ServerDirectMessage.registered[connectionid]) return;
    if (!!name && !ServerDirectMessage.registered[connectionid][name]) return;
    if (name) delete ServerDirectMessage.registered[connectionid][name];
    if (!name || !Object.keys(ServerDirectMessage.registered[connectionid]).length) delete ServerDirectMessage.registered[connectionid];
  }

  public send(msg: S): void {
    ServerDirectMessage.logger.debug(() => `ServerDirectMessage.send, name=${this.name}, connection=${this.connection_id}, msg=${JSON.stringify(msg)}`);
    // @ts-ignore
    Meteor.directStream.send(JSON.stringify({ iccdm: this.name, iccmsg: msg }), this.connection_id);
  }
}

Meteor.startup(() => {
  ICCServer.events.on('connectionclosed', Meteor.bindEnvironment((connectionid: string) => {
    ServerDirectMessage.stopConnection(connectionid);
  }));

  ICCServer.events.on('defunctconnection', Meteor.bindEnvironment((connectionid: string) => {
    ServerDirectMessage.stopConnection(connectionid);
  }));

  Meteor.startup(() => {
    // @ts-ignore
    Meteor.directStream.onMessage(Meteor.bindEnvironment((message, sessionId) => {
      try {
        const msg = JSON.parse(message);
        if (typeof msg !== 'object' || !('iccdm' in msg)) return;
        try {
          ServerDirectMessage.globalreceive(sessionId, msg.iccdm, msg.iccmsg);
        } catch (e) {
          ServerDirectMessage.logger.debug(() => `Error on ServerDirectMessage.globalReceive: ${e}`);
        }
        // @ts-ignore
        this.preventCallingMeteorHandler();
      } catch (e) {
        // If we cannot parse the string into an object, it's not for us.
      }
    }));
  });
});
