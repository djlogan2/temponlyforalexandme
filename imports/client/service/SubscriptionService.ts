import ICCEventEmitter from "/lib/ICCEventEmitter";
import SubscriptionEventEmitter from "/lib/client/SubscriptionEventEmitter";
import Stoppable from "/lib/Stoppable";
import {SubscriptionNames} from "/lib/SubscriptionNames";

export default class SubscriptionService extends Stoppable {
    /**
     * Get an event emitter that automatically subscribes and subscribes when events are listened to
     * @param{SubscriptionNames} publication
     * @return{ICCEventEmitter} Basically an event emitter (on/off/removeAllListeners)
     */

    public getSubscriptionEventEmitter(publication: SubscriptionNames): ICCEventEmitter {
        if (!globalThis.subscriptions[publication]) globalThis.subscriptions[publication] = new SubscriptionEventEmitter(publication, this);
        // @ts-ignore  -- and  YET AGAIN typescript can't seem to figure out that I define it RIGHT HERE!!!
        return globalThis.subscriptions[publication].newEmitter();
    }

    protected stopping(): void {
        if (!(globalThis.subscriptions)) return;
        Object.values(globalThis.subscriptions).forEach((sub) => sub.stop());
        globalThis.subscriptions = {};
    }
}
