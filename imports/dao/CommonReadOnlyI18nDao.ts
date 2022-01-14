import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import I18nRecord from "/lib/records/ClientI18nRecord";
import Stoppable from "/lib/Stoppable";

export default class CommonReadOnlyI18nDao extends ReactiveReadOnlyDao<I18nRecord> {
  constructor(parent: Stoppable | null) {
    super(parent, "clientI18n");
  }

  protected onFieldsChanged(id: string, record: Partial<I18nRecord>): void {
    // Not sure what to do here yet, but I'm sure the client will start to reveal its needs soon!
    // Without a start, this won't be called anyway
  }

  protected onRecordAdded(id: string, record: Partial<I18nRecord>): void {
    // Not sure what to do here yet, but I'm sure the client will start to reveal its needs soon!
    // Without a start, this won't be called anyway
  }

  protected onRecordRemoved(id: string): void {
    // Not sure what to do here yet, but I'm sure the client will start to reveal its needs soon!
    // Without a start, this won't be called anyway
  }

  protected onStop(): void {}
}
