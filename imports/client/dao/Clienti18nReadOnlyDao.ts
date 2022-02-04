import { i18nRecord } from "/lib/records/i18nRecord";
import Stoppable from "/lib/Stoppable";
import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";

export default class Clienti18nReadOnlyDao extends SubscribedReactiveReadOnlyDao<
  i18nRecord,
  string
> {
  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super("i18n", "i18n", parent, subscriptionservice);
  }

  protected onFieldsChanged(id: string, record: Partial<i18nRecord>): void {
    if ("text" in record) {
      const tokenrecord = this.get(id);
      if (tokenrecord) this.events.emit(tokenrecord.token, record.text);
    }
  }

  protected onRecordAdded(id: string, record: Partial<i18nRecord>): void {
    if ("text" in record) {
      const tokenrecord = this.get(id);
      if (tokenrecord) this.events.emit(tokenrecord.token, record.text);
    }
  }

  protected onRecordRemoved(_id: string): void {
    // TODO: What to do if a token record gets deleted??
  }
}
