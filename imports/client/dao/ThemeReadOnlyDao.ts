import SubscriptionService from "/imports/client/service/SubscriptionService";
import Stoppable from "/lib/Stoppable";
import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";
import { ThemeHeaderRecord } from "/lib/records/ThemeRecord";

export default class ThemeReadOnlyDao extends SubscribedReactiveReadOnlyDao<
  ThemeHeaderRecord,
  "themechanged" | "ready"
> {
  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super("themeheaders", "themeheaders", parent, subscriptionservice);
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<ThemeHeaderRecord>,
  ): void {
    this.events.emit("themechanged", this.readOne({}));
  }

  protected onRecordAdded(
    id: string,
    record: Partial<ThemeHeaderRecord>,
  ): void {
    this.events.emit("themechanged", this.readOne({}));
  }

  protected onRecordRemoved(id: string): void {
    this.events.emit("themechanged", null);
  }

  protected onStop(): void {}
}