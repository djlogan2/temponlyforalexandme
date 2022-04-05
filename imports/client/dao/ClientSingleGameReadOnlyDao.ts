import Stoppable from "/lib/Stoppable";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import ClientLogger from "/lib/client/ClientLogger";
import ICCEventEmitter from "/lib/client/ICCEventEmitter";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import ClientConnection from "/lib/client/ClientConnection";
import CommonSingleGameReadOnlyGameDao, {
  GameEvents,
} from "/imports/dao/CommonSingleGameReadOnlyGameDao";

export default class ClientSingleGameReadOnlyDao extends CommonSingleGameReadOnlyGameDao {
  private readonly pEvents: ICCEventEmitter<"move" | "ready">;

  private readonly logger1: ClientLogger;

  private readonly connection: ClientConnection;

  constructor(
    parent: Stoppable | null,
    id: string,
    subscriptionservice: SubscriptionService,
    connection: ClientConnection,
  ) {
    super(parent, id);
    this.logger1 = new ClientLogger(this, "GameReadOnlyDao_js");
    this.pEvents = subscriptionservice.getSubscriptionEventEmitter(
      this,
      "games",
    );
    this.connection = connection;
  }

  public get events(): BasicEventEmitter<GameEvents> {
    return this.pEvents;
  }

  protected onReady(): void {
    this.pEvents?.emit("ready");
  }
}
