import ICCEventEmitter from "/lib/ICCEventEmitter";
import SubscriptionEventEmitter from "/lib/client/SubscriptionEventEmitter";
import Stoppable from "/lib/Stoppable";

export default class SubscriptionService extends Stoppable {
    /**
     * Get an event emitter that automatically subscribes and subscribes when events are listened to
     * @param{string} publication
     * @return{ICCEventEmitter} Basically an event emitter (on/off/removeAllListeners)
     */

    public getSubscriptionEventEmitter(publication: string): ICCEventEmitter {
        if (!global.ICCServer.client) global.ICCServer.client = { dao: {}, subscriptions: {} };
        if (!global.ICCServer.client.subscriptions[publication]) global.ICCServer.client.subscriptions[publication] = new SubscriptionEventEmitter(publication, this);
        return global.ICCServer.client.subscriptions[publication].newEmitter();
    }

    protected stopping(): void {
        if (!(global?.ICCServer?.client?.subscriptions)) return;
        Object.values(global.ICCServer.client.subscriptions).forEach((sub) => sub.stop());
        global.ICCServer.client.subscriptions = {};
    }
}
