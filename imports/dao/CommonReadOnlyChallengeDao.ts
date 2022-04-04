import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import { UserChallengeRecord } from "/lib/records/ChallengeRecord";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import Stoppable from "/lib/Stoppable";

export default abstract class CommonReadOnlyChallengeDao extends ReactiveReadOnlyDao<UserChallengeRecord> {
  protected abstract get events(): BasicEventEmitter<
    "challengeadded" | "challengeremoved" | "challengemodified"
  >;

  constructor(parent: Stoppable | null) {
    super(parent, "challenges");
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<UserChallengeRecord>,
  ): void {
    this.events.emit("challengemodified", id);
  }

  protected onRecordAdded(
    id: string,
    record: Partial<UserChallengeRecord>,
  ): void {
    this.events.emit("challengeadded", id);
  }

  protected onRecordRemoved(id: string): void {
    this.events.emit("challengeremoved", id);
  }
}
