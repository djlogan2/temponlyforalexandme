import { Meteor } from "meteor/meteor";
import PooledEventEmitter from "/lib/client/PooledEventEmitter";
import Stoppable from "/lib/Stoppable";
import { SubscriptionNames } from "/lib/SubscriptionNames";
import ClientLogger from "/lib/client/ClientLogger";

export default class SubscriptionEventEmitter<
  E extends string,
> extends PooledEventEmitter<E> {
  private readonly publication: SubscriptionNames;

  private readonly logger2: ClientLogger;

  private subscription?: Meteor.SubscriptionHandle;

  /**
   *
   * @param{string} publication The name of the servers publication
   * @param{Stoppable|null} parent if there is one
   */
  constructor(publication: SubscriptionNames, parent: Stoppable | null) {
    super(publication, parent);
    this.logger2 = new ClientLogger(this, "SubscriptionEventEmitter");
    this.publication = publication;
  }

  /**
   * Called ONLY when the very first event from an emitter created for this subscription is listened to.
   * It's purpose of course is to subscribe to the collection
   * @protected
   */
  protected onFirstEvent(isready: () => void): void {
    this.logger2.trace(() => `${this.publication} onFirstEvent`);
    this.subscription = Meteor.subscribe(this.publication, {
      onReady: () => {
        if (isready) isready();
      },
    });
  }

  /**
   * Called ONLY when the very last event from an emitter create for this subscription has been terminated.
   * It's purpose of course is to unsubscribe from the collection.
   * @protected
   */
  protected onLastEvent(): void {
    this.logger2.trace(() => `${this.publication} onLastEvent`);
    if (this.subscription) {
      this.subscription.stop();
      delete this.subscription;
    }
  }

  protected stopping(): void {
    this.logger2.trace(() => `${this.publication} stopping`);
    this.onLastEvent();
  }
}
