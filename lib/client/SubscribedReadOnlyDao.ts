import ReadOnlyDao from "/lib/ReadOnlyDao";
import EventEmitter from "eventemitter3";
import Stoppable from "/lib/Stoppable";
import SubscriptionEventEmitter from "/lib/client/SubscriptionEventEmitter";

export default class SubscribedReadOnlyDao<T> extends ReadOnlyDao<T> {
    private events: EventEmitter;

    constructor(publicationname: string, collection: string, parent: Stoppable | null) {
        super(collection, parent);
        this.events = SubscriptionEventEmitter.getSubscriptionEventEmitter(publicationname);
    }

    protected stopping(): void {
        throw new Error("Method not implemented.");
    }
}
