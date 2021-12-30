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

    /**
     * Get an event emitter that automatically subscribes and subscribes when events are listened to
     * @param{string} publication
     * @return{ICCEventEmitter} Basically an event emitter (on/off/removeAllListeners)
     */
    public static getSubscriptionEventEmitter(publication: string): ICCEventEmitter {
        if (!global.ICCServer.subscriptions[publication]) global.ICCServer.subscriptions[publication] = new SubscriptionEventEmitter(publication);
        return global.ICCServer.subscriptions[publication].newEmitter();
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
}
