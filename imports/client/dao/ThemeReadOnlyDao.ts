import SubscriptionService from "/imports/client/service/SubscriptionService";
import Stoppable from "/lib/Stoppable";
import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";
import { ThemeData } from "/lib/records/ThemeRecord";

export default class ThemeReadOnlyDao extends SubscribedReactiveReadOnlyDao<
  ThemeData,
  "event"
> {
  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super("themes", "themedata", parent, subscriptionservice);
  }

  protected onFieldsChanged(id: string, record: Partial<ThemeData>): void {
    this.events.emit("event");
  }

  protected onRecordAdded(id: string, record: Partial<ThemeData>): void {}

  protected onRecordRemoved(id: string): void {}

  protected onStop(): void {}
}
