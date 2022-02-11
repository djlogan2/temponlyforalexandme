import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";
import { Meteor } from "meteor/meteor";
import ClientLogger from "/lib/client/ClientLogger";
import Stoppable from "/lib/Stoppable";
import * as util from "util";
import { ClientGameReadOnlyDao } from "/imports/client/dao/ClientGameReadOnlyDao";
import CommonGameService from "/lib/CommonGameService";
import {
  AnalysisGameRecord,
  BasicGameRecord,
  ComputerPlayGameRecord,
} from "/lib/records/GameRecord";
import { ClientComputerPlayedGame } from "/lib/client/ClientComputerPlayedGame";
import ClientAnalysisGame from "/lib/client/ClientAnalysisGame";
import ClientConnection from "/lib/client/ClientConnection";
import ClientUser from "/lib/client/ClientUser";

export default class GameService extends CommonGameService {
  private readonly logger: ClientLogger;

  private readonly connection: ClientConnection;

  public get events() {
    return this.dao.events;
  }

  constructor(
    parent: Stoppable | null,
    gamedao: ClientGameReadOnlyDao,
    connection: ClientConnection,
  ) {
    super(parent, gamedao);

    this.logger = new ClientLogger(this, "GameService_js");

    this.connection = connection;

    this.dao = gamedao;
  }

  public startComputerGame(
    computerchallenge: ComputerChallengeRecord,
  ): Promise<void> {
    this.logger.debug(
      () =>
        `startComputerGame computerchallenge=${util.inspect(
          computerchallenge,
        )}`,
    );
    return new Promise<void>((resolve, reject) => {
      Meteor.call(
        "startComputerGame",
        computerchallenge,
        (err: Meteor.Error) => {
          if (err) reject(err);
          else {
            resolve();
          }
        },
      );
    });
  }

  protected stopping(): void {}

  protected getClassFromType(
    game: BasicGameRecord,
  ): ClientComputerPlayedGame | ClientAnalysisGame {
    let stupid;

    switch (game.status) {
      case "computer":
        stupid = new ClientComputerPlayedGame(
          this,
          game as ComputerPlayGameRecord,
          this.dao,
          this.connection.user as ClientUser,
        );
        break;
      case "analyzing":
        stupid = new ClientAnalysisGame(
          this,
          game as AnalysisGameRecord,
          this.dao,
        );
        break;
      case "playing":
        throw new Meteor.Error("Not yet supported");
      default: {
        const check: never = game.status;
        throw new Meteor.Error(`UNKNOWN_GAME_RECORD_TYPE: ${check}`);
      }
    }
    return stupid;
  }
}
