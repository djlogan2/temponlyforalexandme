import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import UserRecord from "/lib/records/UserRecord";
import Stoppable from "/lib/Stoppable";

export default class CommonReadOnlyUserDao extends ReactiveReadOnlyDao<UserRecord> {
  constructor(parent: Stoppable | null) {
    super(parent, "users");
  }

  protected onFieldsChanged(id: string, record: Partial<UserRecord>): void {
    // Not sure what to do here yet, but I'm sure the client will start to reveal its needs soon!
    // Without a start, this won't be called anyway
  }

  protected onRecordAdded(id: string, record: Partial<UserRecord>): void {
    // Not sure what to do here yet, but I'm sure the client will start to reveal its needs soon!
    // Without a start, this won't be called anyway
  }

  protected onRecordRemoved(id: string): void {
    // Not sure what to do here yet, but I'm sure the client will start to reveal its needs soon!
    // Without a start, this won't be called anyway
  }

  protected onStop(): void {}
}
