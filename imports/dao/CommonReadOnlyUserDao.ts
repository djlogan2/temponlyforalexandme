import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import UserRecord from "/lib/records/UserRecord";
import Stoppable from "/lib/Stoppable";

export default class CommonReadOnlyUserDao extends ReactiveReadOnlyDao<UserRecord> {
  constructor(parent: Stoppable | null) {
    super(parent, "users");
  }

  private eachField(id: string, record: Partial<UserRecord>): void {
    // TODO: This isn't going to work for friends lists, game users, whathaveyou
    //       We will probably have to have a list of users in global on the client
    //       that are also spread out in other places, like "chatroomusers", "gameusers",
    //       "students", or who knows what else, that are also in this list, so that we
    //       can map them. But, we can worry about THAT later.
    if (globalThis.cuser?.id !== id) return;
    Object.entries(record).forEach(([key, value]) => {
      switch (key) {
        case "locale":
          globalThis.cuser.localeUpdated(value as string);
          break;
        default:
          break;
      }
    });
  }

  protected onFieldsChanged(id: string, record: Partial<UserRecord>): void {
    this.eachField(id, record);
  }

  protected onRecordAdded(id: string, record: Partial<UserRecord>): void {
    this.eachField(id, record);
  }

  protected onRecordRemoved(_id: string): void {
    // Not sure what to do here yet, but I'm sure the client will start to reveal its needs soon!
    // Without a start, this won't be called anyway
  }

  protected onReady(): void {}
}
