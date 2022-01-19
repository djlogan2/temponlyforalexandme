import { i18nRecord } from "/lib/records/i18nRecord";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import Stoppable from "/lib/Stoppable";

export default class Clienti18nReadOnlyDao extends ReactiveReadOnlyDao<i18nRecord> {
  private pEvents;

  constructor(parent: Stoppable | null) {
    super(parent, "i18n");
    this.pEvents =
      globalThis.subscriptionservice.getSubscriptionEventEmitter("i18n");
  }

  protected onFieldsChanged(id: string, record: Partial<i18nRecord>): void {
    if ("text" in record) {
      const tokenrecord = this.get(id);
      if (tokenrecord) this.pEvents.emit(tokenrecord.token, record.text);
    }
  }

  protected onRecordAdded(id: string, record: Partial<i18nRecord>): void {
    if ("text" in record) {
      const tokenrecord = this.get(id);
      if (tokenrecord) this.pEvents.emit(tokenrecord.token, record.text);
    }
  }

  protected onRecordRemoved(_id: string): void {
    // TODO: What to do if a token record gets deleted??
  }

  protected onStop(): void {}
}
