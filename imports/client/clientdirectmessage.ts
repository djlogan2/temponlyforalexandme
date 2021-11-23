import CommonDirectMessage from '../commondirectmessage';
import ClientLogger from './clientlogger';

export default class ClientDirectMessage<S, R> extends CommonDirectMessage<S, R> {
  private static registered: {[key: string]: any} = {};

  public static logger: ClientLogger = new ClientLogger('client/ClientDirectMessage');

  constructor(name: string, handler?: (msg: R) => void) {
    super(name, handler);
    ClientDirectMessage.logger.debug(() => `ClientDirectMessage.constructor name=${name}`);
    if (ClientDirectMessage.registered[name]) throw new Meteor.Error('ALREADY_DEFINED');
    ClientDirectMessage.registered[name] = this;
  }

  stop(): void {
    delete ClientDirectMessage.registered[this.name];
  }

  public static globalreceive(name: string, msg: any) {
    ClientDirectMessage.logger.debug(() => `ClientDirectMessage.globalReceive, name=${name}, msg=${JSON.stringify(msg)}`);
    const clazz = ClientDirectMessage.registered[name];
    if (!clazz) throw new Meteor.Error('MESSAGE_TYPE_NOT_FOUND');
    clazz.received(msg);
  }

  public send(msg: S): void {
    // @ts-ignore
    this.logger.debug(`ClientDirectMessage.send, name=${this.name}, msg=${JSON.stringify(msg)}`);
    // @ts-ignore
    Meteor.directStream.send(JSON.stringify({ iccdm: this.name, iccmsg: msg }));
  }
}

Meteor.startup(() => {
  // @ts-ignore
  Meteor.directStream.onMessage(Meteor.bindEnvironment((message) => {
    try {
      const msg = JSON.parse(message);
      if (typeof msg !== 'object' || !('iccdm' in msg)) return;
      try {
        ClientDirectMessage.logger.debug(() => `ClientDirectMessage received=${message}`);
        ClientDirectMessage.globalreceive(msg.iccdm, msg.iccmsg);
      } catch (e) {
        ClientDirectMessage.logger.debug(() => `Error on ClientDirectMessage.globalReceive: ${e.message}`);
      }
      // @ts-ignore
      //this.preventCallingMeteorHandler();
    } catch (e) {
      // If we cannot parse the string into an object, it's not for us.
    }
  }));
});
