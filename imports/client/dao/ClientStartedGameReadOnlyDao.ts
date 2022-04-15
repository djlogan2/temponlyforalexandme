import Stoppable from "/lib/Stoppable";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import ClientLogger from "/lib/client/ClientLogger";
import { BasicGameRecord, GameTypes } from "/lib/records/GameRecord";
import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";

export default class ClientStartedGameReadOnlyDao extends SubscribedReactiveReadOnlyDao<
  BasicGameRecord,
  "started" | "removed" | "fen" | "ready"
> {
  private readonly logger: ClientLogger;

  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super("games", "games", parent, subscriptionservice);
    this.logger = new ClientLogger(this, "GameReadOnlyDao_js");
    this.start({});
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<BasicGameRecord>,
  ): void {}

  protected onRecordAdded(id: string, record: Partial<BasicGameRecord>): void {
    this.events.emit("started", id);
  }

  protected onRecordRemoved(id: string): void {
    this.events.emit("removed", id);
  }

  protected onReady(): void {
    this.events.emit("ready");
  }

  public status(id: string): undefined | GameTypes {
    const record = this.get(id);
    if (record) return record.status;
  }
}
