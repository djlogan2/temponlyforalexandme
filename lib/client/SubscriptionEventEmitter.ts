import { Meteor } from "meteor/meteor";
import PooledEventEmitter from "/lib/PooledEventEmitter";
import ICCEventEmitter from "/lib/ICCEventEmitter";

export default class SubscriptionEventEmitter extends PooledEventEmitter {
    private publication: string;

    private subscription?: Meteor.SubscriptionHandle;

    private constructor(publication: string) {
        super(publication);
        this.publication = publication;
    }

    public static getSubscriptionEventEmitter(publication: string): ICCEventEmitter {
        if (!global.ICCServer.subscriptions[publication]) global.ICCServer.subscriptions[publication] = new SubscriptionEventEmitter(publication);
        return global.ICCServer.subscriptions[publication].newEmitter();
    }

    protected onFirstEvent(): void {
        Meteor.subscribe(this.publication);
    }

    protected onLastEvent(): void {
        if (this.subscription) {
            this.subscription.stop();
            delete this.subscription;
        }
    }
}
