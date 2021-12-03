import { Meteor } from 'meteor/meteor';
export default abstract class CommonDirectMessage<S, R> {
  // eslint-disable-next-line no-unused-vars
  private receivedHandler: (msg: R) => void;

  protected name: string;

  // eslint-disable-next-line no-unused-vars
  constructor(name: string, handler?: (msg: R) => void) {
    this.name = name;
    if (handler) this.receivedHandler = Meteor.bindEnvironment((msg2) => handler(msg2));
  }

  public received(msg: R) {
    if (this.receivedHandler) this.receivedHandler(msg);
    else throw new Meteor.Error('UNHANDLED_MESSAGE');
  }

  public abstract stop(): void;

  public abstract send(msg: S): void;
}
