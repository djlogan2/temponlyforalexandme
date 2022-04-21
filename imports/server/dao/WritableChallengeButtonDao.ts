import WritableReactiveDao from "/imports/server/dao/WritableReactiveDao";
import { OneChallengeButton } from "/lib/records/ChallengeButtonRecord";
import EventEmitter from "eventemitter3";
import Stoppable from "/lib/Stoppable";

export default class WritableChallengeButtonDao extends WritableReactiveDao<OneChallengeButton> {
  private pEvents = new EventEmitter<"added" | "removed" | "ready">();

  public constructor(parent: Stoppable | null) {
    super(parent, "challengebuttons");
    this.start({});
  }

  public get events() {
    return this.pEvents;
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<OneChallengeButton>,
  ): void {}

  protected onRecordAdded(
    id: string,
    record: Partial<OneChallengeButton>,
  ): void {
    this.pEvents.emit("added", record);
  }

  protected onRecordRemoved(id: string): void {
    this.pEvents.emit("removed", id);
  }

  protected onReady(): void {
    this.pEvents.emit("ready");
  }
}