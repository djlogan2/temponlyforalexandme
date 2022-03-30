import CommonReadOnlyButtonChallengeDao from "/imports/dao/CommonReadOnlyButtonChallengeDao";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import Stoppable from "/lib/Stoppable";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import { OneChallengeButton } from "/lib/records/ChallengeButtonRecord";

export default class ClientChallengeButtonReadOnlyDao extends CommonReadOnlyButtonChallengeDao {
  private pEvents: BasicEventEmitter<"added" | "changed" | "removed" | "ready">;

  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super(parent);
    this.pEvents = subscriptionservice.getSubscriptionEventEmitter(
      this,
      "challengebuttons",
    );
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<OneChallengeButton>,
  ): void {
    this.pEvents.emit("changed");
  }

  protected onRecordAdded(
    id: string,
    record: Partial<OneChallengeButton>,
  ): void {
    this.pEvents.emit("added", record);
  }

  protected onRecordRemoved(id: string): void {
    this.pEvents.emit("removed");
  }

  protected onReady(): void {
    this.pEvents.emit("ready");
  }
}
