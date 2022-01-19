import Stoppable from "/lib/Stoppable";
import ICCEventEmitter from "/lib/ICCEventEmitter";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import { SubscriptionNames } from "/lib/SubscriptionNames";
import { CollectionNames } from "/lib/CollectionNames";
import ReadOnlyDao from "/imports/dao/ReadOnlyDao";

export default abstract class SubscribedReadOnlyDao<
  T,
  E extends string,
> extends ReadOnlyDao<T> {
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
    super(collection, parent);
    this.pEvents =
      subscriptionservice.getSubscriptionEventEmitter(publicationname);
  }

  protected stopping(): void {
    super.stopping();
    this.pEvents.removeAllListeners();
  }
}
