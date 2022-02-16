import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";
import { Meteor } from "meteor/meteor";
import ClientLogger from "/lib/client/ClientLogger";
import Stoppable from "/lib/Stoppable";
import * as util from "util";
import CommonGameService from "/lib/CommonGameService";
import ClientConnection from "/lib/client/ClientConnection";
import ClientStartedGameReadOnlyDao from "../dao/ClientStartedGameReadOnlyDao";

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
        (err: Meteor.Error, id: string) => {
          if (err) reject(err);
          else resolve();
        },
      );
    });
  }

  protected stopping(): void {}
}
