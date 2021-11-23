import CommonLogger from './commonlogger';
import CommonICCServer from './commoniccserver';

declare const ICCServer: CommonICCServer;

export default abstract class CommonDirectMessage<S, R> {
  private receivedHandler: (msg: R) => void;

  private commonlogger: CommonLogger;

  protected name: string;

  constructor(name: string, handler?: (msg: R) => void) {
    this.commonlogger = ICCServer.createLogger('common/CommonDirectMessage');
    this.commonlogger.debug(() => `CommonDirectMessage constructor, name=${name}`);
    this.name = name;
    if (handler) this.receivedHandler = handler;
  }

  public received(msg: R) {
    this.commonlogger.debug(() => `CommonDirectMessage.received, name=${this.name}, msg=${JSON.stringify(msg)}`);
    if (this.receivedHandler) this.receivedHandler(msg);
    else throw new Meteor.Error('UNHANDLED_MESSAGE');
  }

  public abstract stop(): void;

  public abstract send(msg: S): void;
}
