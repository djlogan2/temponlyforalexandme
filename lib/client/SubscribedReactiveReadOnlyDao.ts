import Stoppable from "/lib/Stoppable";
import ICCEventEmitter from "/lib/ICCEventEmitter";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";

export default abstract class SubscribedReactiveReadOnlyDao<T> extends ReactiveReadOnlyDao<T> {
    private pEvents: ICCEventEmitter;

    public get events() {
        return this.pEvents;
    }

    constructor(publicationname: string, collection: string, parent: Stoppable | null, subscriptionservice: SubscriptionService) {
        super(parent, collection);
        this.pEvents = subscriptionservice.getSubscriptionEventEmitter(publicationname);
    }

    protected stopping(): void {
        super.stopping();
        this.pEvents.removeAllListeners();
    }
}
