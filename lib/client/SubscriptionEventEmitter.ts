import { Meteor } from "meteor/meteor";
import PooledEventEmitter from "/lib/PooledEventEmitter";
import Stoppable from "/lib/Stoppable";
import { SubscriptionNames } from "/lib/SubscriptionNames";

export default class SubscriptionEventEmitter extends PooledEventEmitter {
  private readonly publication: SubscriptionNames;

  private subscription?: Meteor.SubscriptionHandle;

  /**
   *
   * @param{string} publication The name of the servers publication
   * @param{Stoppable|null} parent if there is one
   */
  constructor(publication: SubscriptionNames, parent: Stoppable | null) {
    super(publication, parent);
    this.publication = publication;
  }

  /**
   * Called ONLY when the very first event from an emitter created for this subscription is listened to.
   * It's purpose of course is to subscribe to the collection
   * @protected
   */
  protected onFirstEvent(): void {
    this.subscription = Meteor.subscribe(this.publication);
  }

  /**
   * Called ONLY when the very last event from an emitter create for this subscription has been terminated.
   * It's purpose of course is to unsubscribe from the collection.
   * @protected
   */
  protected onLastEvent(): void {
    if (this.subscription) {
      this.subscription.stop();
      delete this.subscription;
    }
  }

  protected stopping(): void {
    this.onLastEvent();
  }
}
