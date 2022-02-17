import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import { UserChallengeRecord } from "/lib/records/ChallengeRecord";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";

export default abstract class CommonReadOnlyChallengeDao extends ReactiveReadOnlyDao<UserChallengeRecord> {
  protected abstract get events(): BasicEventEmitter<
    "challengeadded" | "challengeremoved" | "challengemodified"
  >;

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
