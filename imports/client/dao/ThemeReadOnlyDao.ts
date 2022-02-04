import SubscriptionService from "/imports/client/service/SubscriptionService";
import Stoppable from "/lib/Stoppable";
import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";
import { ThemeRecord } from "/lib/records/ThemeRecord";

export default class ThemeReadOnlyDao extends SubscribedReactiveReadOnlyDao<
  ThemeRecord,
  "themechanged" | "ready"
> {
  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super("themes", "themes", parent, subscriptionservice);
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<ThemeRecord>,
  ): void {
    this.events.emit("themechanged", this.readOne({}));
  }

  protected onRecordAdded(
    id: string,
    record: Partial<ThemeRecord>,
  ): void {
    this.events.emit("themechanged", this.readOne({}));
  }

  protected onRecordRemoved(id: string): void {
    this.events.emit("themechanged", null);
  }

  protected onStop(): void {}
}
