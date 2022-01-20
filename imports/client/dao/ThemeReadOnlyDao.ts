import { ThemeRecord } from "/lib/records/ThemeRecord";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import Stoppable from "/lib/Stoppable";
import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";

export default class ThemeReadOnlyDao extends SubscribedReactiveReadOnlyDao<
  ThemeRecord,
  "event"
> {
  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super("themes", "themes", parent, subscriptionservice);
  }

  protected onFieldsChanged(id: string, record: Partial<ThemeRecord>): void {
    this.events.emit("event");
  }

  protected onRecordAdded(id: string, record: Partial<ThemeRecord>): void {}

  protected onRecordRemoved(id: string): void {}

  protected onStop(): void {}
}
