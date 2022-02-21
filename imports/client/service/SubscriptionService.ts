import ICCEventEmitter from "/lib/client/ICCEventEmitter";
import SubscriptionEventEmitter from "/lib/client/SubscriptionEventEmitter";
import Stoppable from "/lib/Stoppable";
import { SubscriptionNames } from "/lib/SubscriptionNames";
import PooledEventEmitter from "/lib/client/PooledEventEmitter";

export default class SubscriptionService extends Stoppable {
  /**
   * Get an event emitter that automatically subscribes and subscribes when events are listened to
   * @param{Stoppable | null} parent Stoppable parent or null
   * @param{SubscriptionNames} publication
   * @return{ICCEventEmitter} Basically an event emitter (on/off/removeAllListeners)
   */

  public getSubscriptionEventEmitter<E extends string>(
    parent: Stoppable | null,
    publication: SubscriptionNames,
  ): ICCEventEmitter<E> {
    if (!globalThis.subscriptions[publication])
      globalThis.subscriptions[publication] = new SubscriptionEventEmitter(
        publication,
        this,
      );
    return (
      globalThis.subscriptions[publication] as PooledEventEmitter<E>
    ).newEmitter();
  }

  protected stopping(): void {
    if (!globalThis.subscriptions) return;
    Object.values(globalThis.subscriptions).forEach((sub) => sub.stop());
    globalThis.subscriptions = {};
  }
}
