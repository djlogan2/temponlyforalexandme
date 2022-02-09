import sinon from "sinon";
import { expect } from "chai";
import PooledEventEmitter from "/lib/PooledEventEmitter";
import { Meteor } from "meteor/meteor";
import SubscriptionService from "/imports/client/service/SubscriptionService";

describe("SubscriptionEventEmitter", function () {
  it("needs to be tested", function () {
    const subscription = {
      ready(): boolean {
        return true;
      },
      stop(): void {},
    };
    const subscribecall = sinon.stub(Meteor, "subscribe");
    const stopsubscriptioncall = sinon.spy(subscription, "stop");
    subscribecall.returns(subscription);
    const subscriptionservice = new SubscriptionService(null);
    const see = subscriptionservice.getSubscriptionEventEmitter(
      null,
      "subscriptioneventemittertest",
    );
    expect(subscribecall.notCalled, "SubscriptionEventEmitter 1").to.be.true;
    expect(stopsubscriptioncall.notCalled, "SubscriptionEventEmitter 2").to.be
      .true;

    see.on("abcde", console.log);
    expect(subscribecall.calledOnce, "SubscriptionEventEmitter 3").to.be.true;
    expect(stopsubscriptioncall.notCalled, "SubscriptionEventEmitter 4").to.be
      .true;
    expect(subscribecall.getCall(0).args[0]).to.equal(
      "subscriptioneventemittertest",
      "SubscriptionEventEmitter 5",
    );
    expect(globalThis.subscriptions.subscriptioneventemittertest).instanceof(
      PooledEventEmitter,
      "SubscriptionEventEmitter 6",
    );

    see.on("xyz", console.log);
    expect(subscribecall.calledOnce, "SubscriptionEventEmitter 7").to.be.true;
    expect(stopsubscriptioncall.notCalled, "SubscriptionEventEmitter 8").to.be
      .true;

    see.off("abcde");
    expect(subscribecall.calledOnce, "SubscriptionEventEmitter 7").to.be.true;
    expect(stopsubscriptioncall.notCalled, "SubscriptionEventEmitter 8").to.be
      .true;

    see.off("xyz");
    expect(subscribecall.calledOnce, "SubscriptionEventEmitter 9").to.be.true;
    expect(stopsubscriptioncall.calledOnce, "SubscriptionEventEmitter 10").to.be
      .true;

    sinon.restore();
  });
});
