import { i18nRecord } from "/lib/records/i18nRecord";
import Stoppable from "/lib/Stoppable";
import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import CommonLogger from "/lib/CommonLogger";

export default class Clienti18nReadOnlyDao extends SubscribedReactiveReadOnlyDao<
  i18nRecord,
  "translationchanged" | "ready"
> {
  private logger: CommonLogger;

  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super("i18n", "i18n", parent, subscriptionservice);
    this.logger = globalThis.ICCServer.utilities.getLogger(
      this,
      "Clienti18nReadOnlyDao",
    );
    this.logger.trace(() => `Clienti18nReadOnlyDao constructor`);
    this.start({});
  }

  protected onFieldsChanged(id: string, record: Partial<i18nRecord>): void {
    this.logger.trace(
      () => `onFieldsChanged id=${id} record=${JSON.stringify(record)}`,
    );

    this.events.emit("translationchanged", this.readOne({ _id: id }));
  }

  protected onRecordAdded(id: string, record: Partial<i18nRecord>): void {
    this.logger.trace(
      () => `onRecordAdded id=${id} record=${JSON.stringify(record)}`,
    );

    this.events.emit("translationchanged", this.readOne({ _id: id }));
  }

  protected onRecordRemoved(id: string): void {
    // TODO: What to do if a token record gets deleted??
    this.logger.trace(() => `onRecordRemoved id=${id}`);
    this.events.emit("translationchanged", null);
  }
}
