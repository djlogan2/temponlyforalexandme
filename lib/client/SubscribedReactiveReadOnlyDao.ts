import Stoppable from "/lib/Stoppable";
import ICCEventEmitter from "/lib/client/ICCEventEmitter";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import { SubscriptionNames } from "/lib/SubscriptionNames";
import { CollectionNames } from "/lib/CollectionNames";

export default abstract class SubscribedReactiveReadOnlyDao<
  T,
  E extends string,
> extends ReactiveReadOnlyDao<T> {
  private readonly pEvents: ICCEventEmitter<E>;

  public get events() {
    return this.pEvents;
  }

  protected constructor(
    publicationname: SubscriptionNames,
    collection: CollectionNames,
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super(parent, collection);
    this.pEvents = subscriptionservice.getSubscriptionEventEmitter<E>(
      this,
      publicationname,
    );
  }

  protected stopping(): void {
    super.stopping();
    this.pEvents.removeAllListeners();
  }
}
