import SubscriptionService from "/imports/client/service/SubscriptionService";
import Stoppable from "/lib/Stoppable";
import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";
import { ThemeRecord } from "/lib/records/ThemeRecord";
import CommonLogger from "/lib/logger/CommonLogger";

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
      "ThemeReadOnlyDao_ts",
    );
    this.logger.debug(() => `ThemeReadOnlyDao constructor`);
    this.start({});
  }

  protected onFieldsChanged(id: string, record: Partial<ThemeRecord>): void {
    this.logger.debug(
      () => `onFieldsChanged id=${id} record=${JSON.stringify(record)}`,
    );
    this.events.emit("themechanged", this.readOne({}));
  }

  protected onRecordAdded(id: string, record: Partial<ThemeRecord>): void {
    this.logger.debug(
      () => `onRecordAdded id=${id} record=${JSON.stringify(record)}`,
    );
    this.events.emit("themechanged", this.readOne({}));
  }

  protected onRecordRemoved(id: string): void {
    this.logger.debug(() => `onRecordRemoved id=${id}`);
    this.events.emit("themechanged", null);
  }

  protected onReady(): void {
    this.events.emit("ready");
  }
}
