import { GameReadOnlyDao } from "/imports/client/dao/GameReadOnlyDao";
import EventEmitter from "eventemitter3";
import { ClientComputerPlayedGame } from "/lib/client/ClientComputerPlayedGame";
import ClientAnalysisGame from "/lib/client/ClientAnalysisGame";
import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";
import { Meteor } from "meteor/meteor";
import ClientLogger from "/lib/client/ClientLogger";
import Stoppable from "/lib/Stoppable";
import * as util from "util";

export default class GameService extends Stoppable {
  private dao: GameReadOnlyDao;

  private readonly logger: ClientLogger;

  // private readonly pOnStarted: (game: ClientComputerPlayedGame | ClientAnalysisGame) => void;

  // private pEvents = new EventEmitter<"started" | "newListener" | "removeListener">();

  public get events() {
    return this.dao.events;
  }

  // private onStarted(game: ClientComputerPlayedGame | ClientAnalysisGame): void {
  //     this.pEvents.emit("started", game);
  // }

  constructor(parent: Stoppable | null, gamedao: GameReadOnlyDao) {
    super(parent);

    this.logger = new ClientLogger(this, "GameService_js");

    this.dao = gamedao;

    // this.pOnStarted = (game: ClientComputerPlayedGame | ClientAnalysisGame) => this.onStarted(game);

    // this.pEvents.on('newListener', (event) => {
    //     this.logger.debug(() => `newListener is being called because somebody is starting to listen to event ${event}`);
    //     if (event === "started" && !this.pEvents.listenerCount("started")) {
    //         this.logger.debug(() => `Somebody is listening for the start of a game, so we are listening to our dao`);
    //         this.dao.events.on("started", this.pOnStarted);
    //     }
    // });
    // this.pEvents.on('removeListener', (event) => {
    //     this.logger.debug(() => `removeListener is being called because somebody has stopped listening to event ${event}`);
    //     if (event === "started" && this.pEvents.listenerCount("started") === 1) {
    //         this.logger.debug(() => `Last listener for started games has left, so we are quitting on our dao`);
    //         this.dao.events.off("started", this.pOnStarted);
    //     }
    // });
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
          else {
            resolve();
          }
        },
      );
    });
  }

  protected stopping(): void {}
}
