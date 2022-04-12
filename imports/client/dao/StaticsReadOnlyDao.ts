import SubscriptionService from "imports/client/service/SubscriptionService";
import Stoppable from "lib/Stoppable";
import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";
import { StaticsRecord } from "lib/records/StaticsRecord";
import CommonLogger from "/lib/logger/CommonLogger";

export default class StaticsReadOnlyDao extends SubscribedReactiveReadOnlyDao<StaticsRecord, "staticschanged" | "ready"> {
  private logger: CommonLogger;

  constructor(parent: Stoppable | null, subscriptionserice: SubscriptionService) {
    super("statics", "statics", parent, subscriptionserice);

    this.logger = globalThis.ICCServer.utilities.getLogger(this, "StaticsReadOnlyDao");
    this.logger.trace(() => `StaticsReadOnlyDao constructor`);

    this.start({});
  }

  protected onFieldsChanged(id: string, record: Partial<StaticsRecord>): void {
    this.logger.trace(
      () => `onFieldsChanged id=${id} record=${JSON.stringify(record)}`,
    );
    this.events.emit("staticschanged", this.readOne({}));
  }

  protected onRecordAdded(id: string, record: Partial<StaticsRecord>): void {
    this.logger.trace(
      () => `onRecordAdded id=${id} record=${JSON.stringify(record)}`,
    );
    this.events.emit("staticschanged", this.readOne({}));
  }

  protected onRecordRemoved(id: string): void {
    this.logger.trace(() => `onRecordRemoved id=${id}`);
    this.events.emit("staticschanged", null);
  }

  protected onReady(): void {
  }

}