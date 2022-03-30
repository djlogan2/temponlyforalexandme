import CommonReadOnlyChallengeDao from "/imports/dao/CommonReadOnlyChallengeDao";
import ICCEventEmitter from "/lib/client/ICCEventEmitter";
import Stoppable from "/lib/Stoppable";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";

export default class ClientChallengeReadOnlyDao extends CommonReadOnlyChallengeDao {
  private pEvents: ICCEventEmitter<
    "challengeadded" | "challengeremoved" | "challengemodified" | "ready"
  >;

  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super(parent);
    this.pEvents = subscriptionservice.getSubscriptionEventEmitter(
      this,
      "challenges",
    );
    this.start({});
  }

  public get events(): BasicEventEmitter<
    "challengeadded" | "challengeremoved" | "challengemodified"
  > {
    return this.pEvents;
  }

  protected onReady(): void {
    this.pEvents.emit("ready");
  }
}
