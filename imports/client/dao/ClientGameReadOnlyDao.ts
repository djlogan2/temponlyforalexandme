import Stoppable from "/lib/Stoppable";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import CommonReadOnlyGameDao, {
  GameEvents,
} from "/imports/dao/CommonReadOnlyGameDao";
import ClientLogger from "/lib/client/ClientLogger";
import ICCEventEmitter from "/lib/ICCEventEmitter";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";

export class ClientGameReadOnlyDao extends CommonReadOnlyGameDao {
  private readonly pEvents: ICCEventEmitter<"move">;

  private readonly logger: ClientLogger;

  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super(parent);
    this.logger = new ClientLogger(this, "GameReadOnlyDao_js");
    this.pEvents = subscriptionservice.getSubscriptionEventEmitter(
      this,
      "games",
    );
  }

  public get events(): BasicEventEmitter<GameEvents> {
    return this.pEvents;
  }
}
