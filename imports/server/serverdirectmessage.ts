import CommonDirectMessage from '../commondirectmessage';
import ServerICCServer from './servericcserver';

declare const ICCServer: ServerICCServer;

export default class ServerDirectMessage<S, R> implements CommonDirectMessage<S, R> {
  private connection_id: string;

  private receivedHandler: (msg: R) => void;

  private name: string;

  private static registered: { [key: string]: { [key: string]: any } } = {};

  constructor(name: string, connectionId: string, handler?: (msg: R) => void) {
    this.connection_id = connectionId;
    this.name = name;
    if (handler) this.receivedHandler = handler;
    if (!ServerDirectMessage.registered[connectionId]) ServerDirectMessage.registered[connectionId] = {};
    if (ServerDirectMessage.registered[connectionId][name]) throw new Meteor.Error('ALREADY_REGISTERED');
    ServerDirectMessage.registered[connectionId][name] = this;
  }

  public static stopConnection(connectionid: string, name?: string): void {
    if (!ServerDirectMessage.registered[connectionid]) return;
    if (!!name && !ServerDirectMessage.registered[connectionid][name]) return;
    if (name) delete ServerDirectMessage.registered[connectionid][name];
    if (!name || !Object.keys(ServerDirectMessage.registered[connectionid]).length) delete ServerDirectMessage.registered[connectionid];
  }

  public static globalreceive(connectionid: string, name: string, msg: any) {
    const c = ServerDirectMessage.registered[connectionid];
    if (!c) throw new Meteor.Error('CONNECTION_NOT_FOUND');
    const clazz = c[name];
    if (!clazz) throw new Meteor.Error('MESSAGE_TYPE_NOT_FOUND');
    clazz.received(msg);
  }

  protected received(msg: R) {
    if (this.receivedHandler) this.receivedHandler(msg);
    else throw new Meteor.Error('UNHANDLED_MESSAGE');
  }

  public send(msg: S): void {
    // @ts-ignore
    Meteor.directStream.send({ iccdm: this.name, iccmsg: msg }, this.connection_id);
  }

  stop(): void {
    ServerDirectMessage.stopConnection(this.connection_id, this.name);
  }
}

Meteor.startup(() => {
  // @ts-ignore
  Meteor.directStream.onMessage(Meteor.bindEnvironment((message, sessionId) => {
    if (typeof message !== 'object' || !('iccdm' in message)) return;
    ServerDirectMessage.globalreceive(sessionId, message.iccdm, message.iccmsg);
    // @ts-ignore
    this.preventCallingMeteorHandler();
  }));

  ICCServer.events.on('connectionclosed', Meteor.bindEnvironment((connectionid: string) => {
    ServerDirectMessage.stopConnection(connectionid);
  }));

  ICCServer.events.on('defunctconnection', Meteor.bindEnvironment((connectionid: string) => {
    ServerDirectMessage.stopConnection(connectionid);
  }));
});
