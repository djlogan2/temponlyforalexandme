import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import ThemeRecord from "/lib/records/ThemeRecord";
import Stoppable from "/lib/Stoppable";

export default class CommonReadOnlyThemeDao extends ReactiveReadOnlyDao<ThemeRecord> {
  constructor(parent: Stoppable | null) {
    super(parent, "themes");
  }

  protected onFieldsChanged(id: string, record: Partial<ThemeRecord>): void {
    // Not sure what to do here yet, but I'm sure the client will start to reveal its needs soon!
    // Without a start, this won't be called anyway
  }

  protected onRecordAdded(id: string, record: Partial<ThemeRecord>): void {
    // Not sure what to do here yet, but I'm sure the client will start to reveal its needs soon!
    // Without a start, this won't be called anyway
  }

  protected onRecordRemoved(id: string): void {
    // Not sure what to do here yet, but I'm sure the client will start to reveal its needs soon!
    // Without a start, this won't be called anyway
  }

  protected onStop(): void {}
}
