import { Meteor } from "meteor/meteor";
import * as util from "util";
import ClientSingleGameReadOnlyDao from "../dao/ClientSingleGameReadOnlyDao";
import ClientStartedGameReadOnlyDao from "../dao/ClientStartedGameReadOnlyDao";
import { ClientComputerPlayedGame } from "/lib/client/game/ClientComputerPlayedGame";
import ClientConnection from "/lib/client/ClientConnection";
import ClientLogger from "/lib/client/ClientLogger";
import ClientUser from "/lib/client/ClientUser";
import ClientAnalysisGame from "/lib/client/game/ClientAnalysisGame";
import CommonGameService from "/lib/CommonGameService";
import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";
import Stoppable from "/lib/Stoppable";

export default class GameService extends CommonGameService {
  private readonly logger: ClientLogger;

  private readonly connection: ClientConnection;

  private readonly dao: ClientStartedGameReadOnlyDao;

  public get events() {
    return this.dao.events;
  }

  constructor(
    parent: Stoppable | null,
    gamedao: ClientStartedGameReadOnlyDao,
    connection: ClientConnection,
  ) {
    super(parent);

    this.logger = new ClientLogger(this, "GameService_js");

    this.connection = connection;

    this.dao = gamedao;
  }

  public startComputerGame(
    computerchallenge: ComputerChallengeRecord,
  ): Promise<void> {
    this.logger.trace(
      () =>
        `startComputerGame computerchallenge=${util.inspect(
          computerchallenge,
        )}`,
    );

    return new Promise<void>((resolve, reject) => {
      Meteor.call(
        "startComputerGame",
        computerchallenge,
        (err: Meteor.Error, _id: string) => {
          if (err) reject(err);
          else resolve();
        },
      );
    });
  }

  public getGameEntity(id: string) {
    return this.dao.get(id);
  }

  public getTyped(id: string, user: ClientUser) {
    const game = this.dao.get(id);
    if (!game) return undefined;
    const g = new ClientSingleGameReadOnlyDao(
      this,
      id,
      subscriptionservice,
      globalThis.icc.connection,
    );
    switch (game.status) {
      case "computer":
        return new ClientComputerPlayedGame(this, id, g, user);
      case "analyzing":
        return new ClientAnalysisGame(this, id, g);
      default: {
        throw new Meteor.Error("UNKNOWN_GAME_TYPE");
      }
    }
  }

  protected stopping(): void {}
}
