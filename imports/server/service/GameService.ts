import WritableGameDao from "/imports/server/dao/WritableGameDao";
import {
  ClockSettings,
  ComputerChallengeRecord,
  PieceColor,
} from "/lib/records/ChallengeRecord";
import { ComputerPlayGameRecord } from "/lib/records/GameRecord";
import ServerUser from "/lib/server/ServerUser";
import { RatingObject, RatingTypes } from "/lib/records/UserRecord";
import { Mongo } from "meteor/mongo";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import Stoppable from "/lib/Stoppable";
import ServerComputerPlayedGame from "/lib/server/ServerComputerPlayedGame";
import { Meteor, Subscription } from "meteor/meteor";
import PublicationService from "/imports/server/service/PublicationService";
import ServerConnection from "/lib/server/ServerConnection";
import GamePublication from "/imports/server/publications/GamePublication";
import StartComputerGameClientMethod from "/imports/server/clientmethods/StartComputerGameClientMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import ServerLogger from "/lib/server/ServerLogger";
import * as util from "util";
import CommonGameService from "/lib/CommonGameService";
import GameMakeMoveMethod from "/imports/server/clientmethods/GameMakeMoveMethod";

export const STARTING_POSITION: string =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export default class GameService extends CommonGameService {
  private readonly logger: ServerLogger;

  private readonly writabledao: WritableGameDao;

  private readonly readonlydao: CommonReadOnlyGameDao;

  private readonly startcomputergamemethod: StartComputerGameClientMethod;

  private readonly makemovemethod: GameMakeMoveMethod;

  private gamelist: { [id: string]: ServerComputerPlayedGame } = {};

  // private gamehistoryservice: someday_over_the_rainbow;

  constructor(
    parent: Stoppable | null,
    writabledao: WritableGameDao,
    readonlydao: CommonReadOnlyGameDao,
    publicationservice: PublicationService,
    connectionservice: ConnectionService,
  ) {
    super(parent, readonlydao);
    this.logger = new ServerLogger(this, "GameService_js");
    this.writabledao = writabledao;
    this.readonlydao = readonlydao;
    publicationservice.publishDao(
      "games",
      (sub: Subscription, connection: ServerConnection, ...args: any[]) =>
        new GamePublication(this, sub, connection, args),
    );

    this.startcomputergamemethod = new StartComputerGameClientMethod(
      this,
      connectionservice,
      this,
    );

    this.makemovemethod = new GameMakeMoveMethod(
      this,
      connectionservice,
      readonlydao,
    );
  }

  public startComputerGame(
    challenger: ServerUser,
    computerchallenge: ComputerChallengeRecord,
  ): string {
    this.logger.debug(
      () =>
        `startComputerGame challenger=${
          challenger.id
        } computerchallenge=${util.inspect(computerchallenge)}`,
    );
    // TODO: How do we handle the computers rating?
    const opponentcolor: PieceColor =
      computerchallenge.color ||
      this.determineColor(
        challenger.id,
        "computer",
        challenger.ratings.computer.rating,
        challenger.ratings.computer.rating,
      );

    let whiteClockSettings: ClockSettings;
    let blackClockSettings: ClockSettings;

    if (opponentcolor === "w") {
      whiteClockSettings = computerchallenge.clock;
      blackClockSettings =
        computerchallenge.opponentclocks || computerchallenge.clock;
    } else {
      blackClockSettings = computerchallenge.clock;
      whiteClockSettings =
        computerchallenge.opponentclocks || computerchallenge.clock;
    }
    const now = new Date().getTime();

    const wcurrent =
      whiteClockSettings.minutes * 60 * 1000 +
      (whiteClockSettings.adjust?.type === "inc"
        ? whiteClockSettings.adjust.incseconds * 1000
        : 0);
    const bcurrent = blackClockSettings.minutes * 60 * 1000;
    const white = {
      initial: whiteClockSettings,
      current: wcurrent,
      starttime: now,
    };
    const black = {
      initial: blackClockSettings,
      current: bcurrent,
      starttime: now,
    };

    const gamerecord: Mongo.OptionalId<ComputerPlayGameRecord> = {
      startTime: new Date(),
      isolation_group: challenger.isolation_group,
      status: "computer",
      opponent: {
        username: challenger.username,
        userid: challenger.id,
        rating: challenger.ratings.computer.rating,
        titles: challenger.titles,
      },
      opponentcolor,
      tomove: "w",
      fen: STARTING_POSITION,
      pending: {
        w: { draw: false, abort: false, adjourn: false, takeback: 0 },
        b: { draw: false, abort: false, adjourn: false, takeback: 0 },
      },
      skill_level: computerchallenge.skill_level,
      clocks: { w: white, b: black },
      observers: [],
      variations: {
        halfmovetakeback: 0,
        currentmoveindex: 0,
        movelist: [{ variations: [] }],
      },
    };
    const id = this.writabledao.insert(gamerecord);
    gamerecord._id = id;
    const game = new ServerComputerPlayedGame(
      this,
      gamerecord as ComputerPlayGameRecord,
      this.readonlydao,
      this.writabledao,
    );
    this.gamelist[id] = game;
    game.startClock();
    return id;
  }

  private static getRatingType(clock: ClockSettings): RatingTypes {
    let etime = clock.minutes;
    if (clock.adjust) etime += (clock.adjust.incseconds * 2.0) / 3.0;
    if (etime < 3) return "bullet";
    return etime < 15 ? "blitz" : "standard";
  }

  private static winDrawLossAssessValues(
    robject1: RatingObject,
    robject2: RatingObject,
  ) {
    let adjust = 0;
    const avg = (robject1.rating + robject2.rating) / 2.0;
    if (avg < 1600.0) adjust = 1;
    else if (avg > 1600.0) adjust = -1;

    const opponentNumberOfGames = robject2.won + robject2.draw + robject2.lost;
    const yourNumberOfGames = robject1.won + robject1.draw + robject1.lost;
    const Kopp = opponentNumberOfGames > 20 ? 1 : 1 + opponentNumberOfGames;
    const KYou = yourNumberOfGames > 20 ? 1 : 21;
    const KYourDiv = yourNumberOfGames > 20 ? 1 : 1 + yourNumberOfGames;
    const KOppdiv = opponentNumberOfGames > 20 ? 1 : 21;
    const resultw =
      robject1.rating +
      ((32 + adjust) *
        Kopp *
        KYou *
        (1 - 1 / (1 + 10 ** ((robject2.rating - robject1.rating) / 400.0)))) /
        KYourDiv /
        KOppdiv;
    const resultd =
      robject1.rating +
      ((32 + adjust) *
        Kopp *
        KYou *
        (0.5 - 1 / (1 + 10 ** ((robject2.rating - robject1.rating) / 400.0)))) /
        KYourDiv /
        KOppdiv;
    const resultl =
      robject1.rating +
      ((32 + adjust) *
        Kopp *
        KYou *
        (0 - 1 / (1 + 10 ** ((robject2.rating - robject1.rating) / 400.0)))) /
        KYourDiv /
        KOppdiv;

    return {
      win: Math.ceil(resultw),
      draw: Math.round(resultd),
      loss: Math.floor(resultl),
    };
  }

  private determineColor(
    // Don't delete these, we are going to need them when we do eventually get
    // a game history.
    _id1: string,
    _id2: string,
    rating1: number,
    rating2: number,
  ): PieceColor {
    let p1white = 0;

    // TODO: When we get a game history service, we shall look at the history!
    const games: PieceColor[] = [];

    let weight = games.length;
    const count = weight;

    games.forEach((color) => {
      if (color === "w") p1white -= weight;
      else p1white += weight;
      weight -= 1;
    });

    // Get the weight between 0 and 1
    if (count) p1white /= (count * (count + 1)) / 2;

    // History accounts for 2/3 of the choice
    p1white *= 2;

    // The rating difference accounts for 1/3 of the choice
    if (rating1 > rating2) {
      p1white += rating2 / rating1 - 1.0;
    } else {
      p1white += 1.0 - rating1 / rating2;
    }

    // Now we have a weighted score of who is more or less likely to be white
    p1white /= 3;
    // // We have to get it +/- 0.5
    // p1white /= 2;
    const chance = 0.5 + p1white;
    const random = Math.random();
    return random < chance ? "w" : "b";
  }

  protected stopping(): void {}
}
