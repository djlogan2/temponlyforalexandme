import SubscribedReactiveReadOnlyDao from "/lib/client/SubscribedReactiveReadOnlyDao";
import { ComputerPlayGameRecord, GameTypes } from "/lib/records/GameRecord";
import { ClientComputerPlayedGame } from "/lib/client/ClientComputerPlayedGame";
import ClientAnalysisGame from "/lib/client/ClientAnalysisGame";
import { Meteor } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import ClientLogger from "/lib/client/ClientLogger";
import * as util from "util";

export class GameReadOnlyDao extends SubscribedReactiveReadOnlyDao<
  ComputerPlayGameRecord,
  "started" | "deleted" | "ended" | "move"
> {
  private readonly commondao: CommonReadOnlyGameDao; // Yea, kinda weird, but to share code, we need two dao's

  private readonly logger: ClientLogger;

  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
    commondao: CommonReadOnlyGameDao,
  ) {
    super("games", "games", parent, subscriptionservice);
    this.logger = new ClientLogger(this, "GameReadOnlyDao_js");
    this.commondao = commondao;
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<ComputerPlayGameRecord>,
  ): void {
    this.logger.debug(
      () => `onFieldsChanged id=${id} game=${util.inspect(record)}`,
    );
  }

  protected onRecordAdded(
    id: string,
    record: Partial<ComputerPlayGameRecord>,
  ): void {
    this.logger.debug(
      () => `onRecordAdded id=${id} game=${util.inspect(record)}`,
    );
    const game = this.gameFactory(id, record.status as GameTypes);
    this.events.emit("started", game);
  }

  protected onRecordRemoved(id: string): void {
    this.logger.debug(() => `onRecordRemoved id=${id}`);
    this.events.emit("deleted");
  }

  public gameFactory(
    id: string,
    type: GameTypes,
  ): ClientComputerPlayedGame | ClientAnalysisGame {
    let stupid;
    // eslint-disable-next-line default-case
    switch (type) {
      case "computer":
        stupid = new ClientComputerPlayedGame(this, id, this.commondao);
        break;
      case "analyzing":
        stupid = new ClientAnalysisGame(this, id, this.commondao, this);
        break;
      case "playing":
        throw new Meteor.Error("Not yet supported");
    }
    return stupid;
  }
}
