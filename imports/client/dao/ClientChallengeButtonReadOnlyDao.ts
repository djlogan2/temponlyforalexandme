import CommonReadOnlyButtonChallengeDao from "/imports/dao/CommonReadOnlyButtonChallengeDao";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import Stoppable from "/lib/Stoppable";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import { OneChallengeButton } from "/lib/records/ChallengeButtonRecord";

type TEvents = "added" | "changed" | "removed" | "ready";

export default class ClientChallengeButtonReadOnlyDao extends CommonReadOnlyButtonChallengeDao {
  private pEvents: BasicEventEmitter<TEvents>;

  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super(parent);
    this.pEvents = subscriptionservice.getSubscriptionEventEmitter(
      this,
      "challengebuttons",
    );

    this.pEvents.emit("ready");
  }

  public get events(): BasicEventEmitter<TEvents> {
    return this.pEvents;
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
