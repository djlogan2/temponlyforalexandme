import Stoppable from "/lib/Stoppable";
import SubscriptionEventEmitter from "/lib/client/SubscriptionEventEmitter";
import ICCEventEmitter from "/lib/ICCEventEmitter";
import ReactiveReadOnlyDao from "/lib/ReactiveReadOnlyDao";

export default abstract class SubscribedReactiveReadOnlyDao<T> extends ReactiveReadOnlyDao<T> {
    private pEvents: ICCEventEmitter;

    public get events() {
        return this.pEvents;
    }

    constructor(publicationname: string, collection: string, parent: Stoppable | null) {
        super(parent, collection);
        this.pEvents = SubscriptionEventEmitter.getSubscriptionEventEmitter(publicationname);
    }

    protected stopping(): void {
        super.stopping();
        this.pEvents.removeAllListeners();
    }
}
