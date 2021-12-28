import Stoppable from "/lib/Stoppable";
import SubscriptionEventEmitter from "/lib/client/SubscriptionEventEmitter";
import ICCEventEmitter from "/lib/ICCEventEmitter";
import ReactiveReadOnlyDao from "/lib/ReactiveReadOnlyDao";

export default abstract class SubscribedReactiveReadOnlyDao<T> extends ReactiveReadOnlyDao<T> {
    private events: ICCEventEmitter;

    constructor(publicationname: string, collection: string, parent: Stoppable | null) {
        super(parent, collection);
        this.events = SubscriptionEventEmitter.getSubscriptionEventEmitter(publicationname);
    }

    protected stopping(): void {
        this.events.removeAllListeners();
    }
}
