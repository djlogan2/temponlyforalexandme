import { Meteor } from "meteor/meteor";
import PooledEventEmitter from "/lib/PooledEventEmitter";
import Stoppable from "/lib/Stoppable";

export default class SubscriptionEventEmitter extends PooledEventEmitter {
    private publication: string;

    private subscription?: Meteor.SubscriptionHandle;

    constructor(publication: string, parent: Stoppable | null) {
        super(publication, parent);
        this.publication = publication;
    }

    protected onFirstEvent(): void {
        this.subscription = Meteor.subscribe(this.publication);
    }

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
