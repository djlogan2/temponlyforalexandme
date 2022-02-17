import WritableGameDao from "/imports/server/dao/WritableGameDao";
import {
  ClockSettings,
  ComputerChallengeRecord,
  PieceColor,
  UserChallengeRecord,
} from "/lib/records/ChallengeRecord";
import {
  BasicPlayedGameRecord,
  ComputerPlayGameRecord,
  PlayerInfo,
  TwoPlayerPlayedGameRecord,
} from "/lib/records/GameRecord";
import { RatingObject, RatingTypes } from "/lib/records/UserRecord";
import Stoppable from "/lib/Stoppable";
import ServerComputerPlayedGame from "/lib/server/game/ServerComputerPlayedGame";
import { Meteor, Subscription } from "meteor/meteor";
import PublicationService from "/imports/server/service/PublicationService";
import ServerConnection from "/lib/server/ServerConnection";
import GamePublication from "/imports/server/publications/GamePublication";
import StartComputerGameClientMethod from "/imports/server/clientmethods/StartComputerGameClientMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import ServerLogger from "/lib/server/ServerLogger";
import * as util from "util";
import CommonGameService from "/lib/CommonGameService";
import GameMakeMoveMethod from "/imports/server/clientmethods/game/GameMakeMoveMethod";
import ServerAnalysisGame from "/lib/server/game/ServerAnalysisGame";
import GameResignMethod from "/imports/server/clientmethods/game/GameResignMethod";
import GameDrawMethod from "/imports/server/clientmethods/game/GameDrawMethod";
import InstanceService from "/imports/server/service/InstanceService";
import ServerUserPlayedGame from "/lib/server/game/ServerUserPlayedGame";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import User from "/lib/User";

export const STARTING_POSITION: string =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export default class GameService extends CommonGameService {
  private readonly logger: ServerLogger;

  private readonly writabledao: WritableGameDao;

  private readonly startcomputergamemethod: StartComputerGameClientMethod;

  private readonly makemovemethod: GameMakeMoveMethod;

  private readonly drawmethod: GameDrawMethod;

  private readonly resignmethod: GameResignMethod;

  private readonly instanceservice: InstanceService;

  private readonly userdao: WritableUserDao;

  // private gamehistoryservice: someday_over_the_rainbow;

  constructor(
    parent: Stoppable | null,
    writabledao: WritableGameDao,
    publicationservice: PublicationService,
    connectionservice: ConnectionService,
    instanceservice: InstanceService,
    userdao: WritableUserDao,
  ) {
    super(parent);

    this.logger = new ServerLogger(this, "GameService_js");
    this.writabledao = writabledao;
    this.userdao = userdao;

    this.instanceservice = instanceservice;

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
    this.makemovemethod = new GameMakeMoveMethod(this, connectionservice, this);
    this.resignmethod = new GameResignMethod(this, connectionservice, this);
    this.drawmethod = new GameDrawMethod(this, connectionservice, this);
  }

  protected startMethods(): void {}

  public getTyped(
    id: string,
  ): ServerComputerPlayedGame | ServerAnalysisGame | undefined {
    const game = this.writabledao.get(id);
    if (!game) return undefined;
    switch (game.status) {
      case "computer":
        return new ServerComputerPlayedGame(this, id, this.writabledao);
      case "analyzing":
        return new ServerAnalysisGame(this, id, this.writabledao);
      default: {
        throw new Meteor.Error("UNKNOWN_GAME_TYPE");
      }
    }
  }

  private static getRatingType(
    challenge: UserChallengeRecord,
  ): RatingTypes | null {
    let opponentsEtime;

    if (challenge.opponentclocks) {
      opponentsEtime = challenge.opponentclocks.minutes;
      if (challenge.opponentclocks.adjust)
        opponentsEtime += Math.round(
          (2.0 * challenge.opponentclocks.adjust.incseconds) / 3.0,
        );
    }

    let etime = challenge.clock.minutes;

    if (challenge.clock.adjust)
      etime += Math.round((2.0 * challenge.clock.adjust.incseconds) / 3.0);

    if (opponentsEtime && opponentsEtime !== etime) return null;

    if (etime < 3) return "bullet";
    if (etime < 15) return "blitz";

    return "standard";
  }

  public startGameFromChallenge(
    challenger: User,
    challenge: ComputerChallengeRecord | UserChallengeRecord,
    connectionid: string,
  ): string {
    this.logger.debug(
      () =>
        `startComputerGame challenger=${
          challenger.id
        } computerchallenge=${util.inspect(challenge)}`,
    );

    let ratingtype: RatingTypes | null = null;

    if ("skill_level" in challenge) ratingtype = "computer";
    else if (challenge.rated) ratingtype = GameService.getRatingType(challenge);

    // It has to be a positive integer or zero
    if (
      challenge.clock.minutes < 0 ||
      !Number.isInteger(challenge.clock.minutes)
    )
      throw new Meteor.Error("ILLEGAL_TIME");

    // If it's zero, we have to have a non-zero increment/delay
    if (challenge.clock.minutes === 0) {
      if (!challenge.clock.adjust?.incseconds)
        throw new Meteor.Error("ILLEGAL_TIME");
    }

    // If inc/delay exists, it must be a positive integer
    if (challenge.clock.adjust) {
      if (
        challenge.clock.adjust.incseconds < 1 ||
        !Number.isInteger(challenge.clock.adjust.incseconds)
      )
        throw new Meteor.Error("ILLEGAL_TIME");
    }

    // TODO: How do we handle the computers rating?
    const opponentcolor: PieceColor =
      challenge.color ||
      this.determineColor(
        challenger.id,
        "computer",
        ratingtype ? challenger.ratings[ratingtype].rating : 1600,
        ratingtype ? challenger.ratings[ratingtype].rating : 1600,
      );

    let whiteClockSettings: ClockSettings;
    let blackClockSettings: ClockSettings;

    let whiteplayer: PlayerInfo | null = null;
    let blackplayer: PlayerInfo | null = null;

    const challengeuser =
      "owner" in challenge ? this.userdao.get(challenge.owner) : null;

    const ownerrating = ratingtype
      ? challenger.ratings[ratingtype].rating
      : 1600;
    const challengerating =
      (ratingtype ? challengeuser?.ratings[ratingtype].rating : 1600) || 1600;

    if (opponentcolor === "w") {
      whiteClockSettings = challenge.clock;
      blackClockSettings = challenge.opponentclocks || challenge.clock;
      if (challengeuser) {
        whiteplayer = {
          userid: challenger.id,
          rating: ownerrating,
          titles: challenger.titles,
        };
        blackplayer = {
          userid: challengeuser._id,
          rating: challengerating,
          titles: challengeuser.titles || [],
        };
      }
    } else {
      blackClockSettings = challenge.clock;
      whiteClockSettings = challenge.opponentclocks || challenge.clock;
      if (challengeuser) {
        blackplayer = {
          userid: challenger.id,
          rating: ownerrating,
          titles: challenger.titles,
        };
        whiteplayer = {
          userid: challengeuser._id,
          rating: challengerating,
          titles: challengeuser.titles || [],
        };
      }
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

    let gamerecord: BasicPlayedGameRecord = {
      _id: "x",
      startTime: new Date(),
      instance_id: this.instanceservice.instanceid,
      connection_id: connectionid,
      isolation_group: challenger.isolation_group,
      status: ratingtype === "computer" ? "computer" : "playing",
      tomove: "w",
      fen: STARTING_POSITION,
      pending: {
        w: { draw: false, abort: false, adjourn: false, takeback: 0 },
        b: { draw: false, abort: false, adjourn: false, takeback: 0 },
      },
      clocks: { w: white, b: black },
      observers: [],
      variations: {
        halfmovetakeback: 0,
        currentmoveindex: 0,
        movelist: [{ variations: [] }],
      },
    };

    if ("skill_level" in challenge) {
      (gamerecord as ComputerPlayGameRecord) = {
        ...gamerecord,
        status: "computer",
        opponent: {
          username: challenger.username,
          userid: challenger.id,
          rating: challenger.ratings.computer.rating,
          titles: challenger.titles,
        },
        opponentcolor,
        skill_level: challenge.skill_level,
      };
    } else {
      if (!whiteplayer || !blackplayer)
        throw new Meteor.Error("UNABLE_TO_FIND_USER");
      (gamerecord as TwoPlayerPlayedGameRecord) = {
        ...gamerecord,
        white: whiteplayer,
        black: blackplayer,
        rated: challenge.rated,
        lag: { w: { active: [], pings: [] }, b: { active: [], pings: [] } },
        status: "playing",
      };
    }

    const id = this.writabledao.insert(gamerecord);
    gamerecord._id = id;
    const game =
      ratingtype === "computer"
        ? new ServerComputerPlayedGame(this, id, this.writabledao)
        : new ServerUserPlayedGame(this, id, this.writabledao);
    game.startClock();
    return id;
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
