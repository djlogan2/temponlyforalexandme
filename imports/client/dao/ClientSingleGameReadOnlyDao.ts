import Stoppable from "/lib/Stoppable";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import ClientLogger from "/lib/client/ClientLogger";
import ICCEventEmitter from "/lib/client/ICCEventEmitter";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import { ClientComputerPlayedGame } from "/lib/client/game/ClientComputerPlayedGame";
import ClientAnalysisGame from "/lib/client/game/ClientAnalysisGame";
import ClientUser from "/lib/client/ClientUser";
import { Meteor } from "meteor/meteor";
import ClientConnection from "/lib/client/ClientConnection";
import CommonSingleGameReadOnlyGameDao, {
  GameEvents,
} from "/imports/dao/CommonSingleGameReadOnlyGameDao";
import { BasicGameRecord } from "/lib/records/GameRecord";

export default class ClientSingleGameReadOnlyDao extends CommonSingleGameReadOnlyGameDao {
  private readonly pEvents: ICCEventEmitter<"move">;

  private readonly logger: ClientLogger;

  private readonly connection: ClientConnection;

  constructor(
    parent: Stoppable | null,
    id: string,
    subscriptionservice: SubscriptionService,
    connection: ClientConnection,
  ) {
    super(parent, id);
    this.logger = new ClientLogger(this, "GameReadOnlyDao_js");
    this.pEvents = subscriptionservice.getSubscriptionEventEmitter(
      this,
      "games",
    );
    this.connection = connection;
    this.start({});
  }

  public get events(): BasicEventEmitter<GameEvents> {
    return this.pEvents;
  }
}
