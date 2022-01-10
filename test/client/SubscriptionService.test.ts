import PooledEventEmitter from "/lib/PooledEventEmitter";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import {expect} from "chai";
import {SubscriptionNames} from "/lib/SubscriptionNames";

class TestPooledEventEmitter extends PooledEventEmitter {
    public stopCalled: boolean = false;

    constructor(poolname: SubscriptionNames) {
        super(poolname, null);
    }

    // prepare-to-remove-ts-ignore
    // eslint-disable-next-line class-methods-use-this
    protected onFirstEvent(): void {
    }

    // prepare-to-remove-ts-ignore
    // eslint-disable-next-line class-methods-use-this
    protected onLastEvent(): void {
    }

    // prepare-to-remove-ts-ignore
    // eslint-disable-next-line class-methods-use-this
    protected stopping(): void {
        this.stopCalled = true;
    }
}
describe("SubscriptionService", function() {
    it("should stop subscriptions when the service is stopped", function() {
        const sub1 = new TestPooledEventEmitter("sub1");
        const sub2 = new TestPooledEventEmitter("sub2");
        const sub3 = new TestPooledEventEmitter("sub3");
        globalThis.subscriptions = {
            sub1,
            sub2,
            sub3,
        };
        const subscriptionservice = new SubscriptionService(null);
        subscriptionservice.stop();
        expect(sub1.stopCalled).to.be.true;
        expect(sub2.stopCalled).to.be.true;
        expect(sub3.stopCalled).to.be.true;
    });
});
