import { Meteor } from 'meteor/meteor';
import CommonDirectMessage from '../commondirectmessage';

export default class ClientDirectMessage<S, R> extends CommonDirectMessage<S, R> {
  private static registered: {[key: string]: any} = {};

  // eslint-disable-next-line no-unused-vars
  constructor(name: string, handler?: (msg: R) => void) {
    super(name, handler);
    if (ClientDirectMessage.registered[name]) throw new Meteor.Error('ALREADY_DEFINED');
    ClientDirectMessage.registered[name] = this;
  }

  stop(): void {
    delete ClientDirectMessage.registered[this.name];
  }

  public static globalreceive(name: string, msg: any) {
    const clazz = ClientDirectMessage.registered[name];
    if (!clazz) throw new Meteor.Error('MESSAGE_TYPE_NOT_FOUND');
    clazz.received(msg);
  }

  public send(msg: S): void {
    // @ts-ignore
    Meteor.directStream.send(JSON.stringify({ iccdm: this.name, iccmsg: msg }));
  }
}

Meteor.startup(() => {
  function processDirectStreamMessage(message: string) {
    try {
      const msg = JSON.parse(message);
      if (typeof msg !== 'object' || !('iccdm' in msg)) return;
      // @ts-ignore
      this.preventCallingMeteorHandler();
      ClientDirectMessage.globalreceive(msg.iccdm, msg.iccmsg);
    } catch (e) {
      // If we cannot parse the string into an object, it's not for us.
    }
  }
  // @ts-ignore
  Meteor.directStream.onMessage(processDirectStreamMessage);
});
