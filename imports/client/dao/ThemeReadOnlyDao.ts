import SubscriptionService from "/imports/client/service/SubscriptionService";
import Stoppable from "/lib/Stoppable";
import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";
import { ThemeRecord } from "/lib/records/ThemeRecord";
import CommonLogger from "/lib/CommonLogger";

export default class ThemeReadOnlyDao extends SubscribedReactiveReadOnlyDao<
  ThemeRecord,
  "themechanged" | "ready"
> {
  private logger: CommonLogger;

  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super("themes", "themes", parent, subscriptionservice);
    this.logger = globalThis.ICCServer.utilities.getLogger(
      this,
      "ThemeReadOnlyDao",
    );
    this.logger.trace(() => `ThemeReadOnlyDao constructor`);
    this.start({});
  }

  protected onFieldsChanged(id: string, record: Partial<ThemeRecord>): void {
    this.logger.trace(
      () => `onFieldsChanged id=${id} record=${JSON.stringify(record)}`,
    );
    this.events.emit("themechanged", this.readOne({}));
  }

  protected onRecordAdded(id: string, record: Partial<ThemeRecord>): void {
    this.logger.trace(
      () => `onRecordAdded id=${id} record=${JSON.stringify(record)}`,
    );
    this.events.emit("themechanged", this.readOne({}));
  }

  protected onRecordRemoved(id: string): void {
    this.logger.trace(() => `onRecordRemoved id=${id}`);
    this.events.emit("themechanged", null);
  }
}
