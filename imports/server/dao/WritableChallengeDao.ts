import { UserChallengeRecord } from "/lib/records/ChallengeRecord";
import WritableReactiveDao from "/imports/server/dao/WritableReactiveDao";
import EventEmitter from "eventemitter3";
import Stoppable from "/lib/Stoppable";

export default class WritableChallengeDao extends WritableReactiveDao<UserChallengeRecord> {
  private pEvents = new EventEmitter<"added" | "removed" | "ready">();

  public constructor(parent: Stoppable | null) {
    super(parent, "challenges");
    this.start({});
  }

  public get events() {
    return this.pEvents;
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<UserChallengeRecord>,
  ): void {}

  protected onRecordAdded(
    id: string,
    record: Partial<UserChallengeRecord>,
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
