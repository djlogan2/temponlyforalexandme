import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";
import GameService, {
  STARTING_POSITION,
} from "/imports/server/service/GameService";
import sinon, { SinonSandbox, SinonStubbedInstance } from "sinon";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import PublicationService from "/imports/server/service/PublicationService";
import ConnectionService from "/imports/server/service/ConnectionService";
import ServerUser from "/lib/server/ServerUser";
import chai, { expect } from "chai";
import { Meteor } from "meteor/meteor";
import { ComputerPlayGameRecord } from "/lib/records/GameRecord";
import { Mongo } from "meteor/mongo";
import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";
import { RatingObject, RatingTypes } from "/lib/records/UserRecord";
import ServerComputerPlayedGame from "/lib/server/game/ServerComputerPlayedGame";
import CommonSingleGameReadOnlyGameDao from "/imports/dao/CommonSingleGameReadOnlyGameDao";
import InstanceService from "/imports/server/service/InstanceService";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import ChessEngineService from "/imports/server/service/ChessEngineService";
import BookService from "/imports/server/service/BookService";

describe("GameService", function () {
  describe("startGameFromChallenge", function () {
    // play_computer
    // already playing
    //
    let sandbox: SinonSandbox;
    let instanceservice: InstanceService;
    let writabledao: SinonStubbedInstance<WritableGameDao>;
    let readonlydao: SinonStubbedInstance<CommonSingleGameReadOnlyGameDao>;
    let publicationservice: SinonStubbedInstance<PublicationService>;
    let connectionservice: SinonStubbedInstance<ConnectionService>;
    let userdao: SinonStubbedInstance<WritableUserDao>;
    let user: SinonStubbedInstance<ServerUser>;
    let engineservice: SinonStubbedInstance<ChessEngineService>;
    let bookservice: SinonStubbedInstance<BookService>;
    let gameservice: GameService;
    let origClock: any;

    beforeEach(function () {
      sandbox = sinon.createSandbox();
      instanceservice = sandbox.createStubInstance(InstanceService);
      writabledao = sandbox.createStubInstance(WritableGameDao);
      readonlydao = sandbox.createStubInstance(ServerReadOnlyGameDao);
      publicationservice = sandbox.createStubInstance(PublicationService);
      connectionservice = sandbox.createStubInstance(ConnectionService);
      engineservice = sandbox.createStubInstance(ChessEngineService);
      bookservice = sandbox.createStubInstance(BookService);
      user = sandbox.createStubInstance(ServerUser);
      sandbox.stub(user, "id").get(() => "idxxid");
      sandbox.stub(user, "isolation_group").get(() => "myisogroup");
      sandbox.stub(user, "username").get(() => "yyusernameyy");
      sandbox.stub(user, "titles").get(() => ["GM", "C"]);
      origClock = ServerComputerPlayedGame.prototype.startClock;
      ServerComputerPlayedGame.prototype.startClock = sandbox.stub();
      const ratings: { [R in RatingTypes]: RatingObject } = {
        bullet: { rating: 1600, won: 0, draw: 0, lost: 0 },
        blitz: { rating: 1600, won: 0, draw: 0, lost: 0 },
        standard: { rating: 1600, won: 0, draw: 0, lost: 0 },
        computer: { rating: 1600, won: 0, draw: 0, lost: 0 },
      };
      sandbox.stub(user, "ratings").get(() => ratings);
      sandbox.stub(Meteor, "methods");
      gameservice = new GameService(
        null,
        writabledao,
        publicationservice,
        connectionservice,
        instanceservice,
        userdao,
        engineservice,
        bookservice,
      );
    });

    afterEach(function () {
      sandbox.restore();
      // @ts-ignore
      ServerComputerPlayedGame.prototype.startClock = origClock;
    });

    it("should fail 0 increment with ILLEGAL_TIME", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 15, adjust: { type: "inc", incseconds: 0 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail 0 us with ILLEGAL_TIME", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 15, adjust: { type: "us", incseconds: 0 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail 0 bronstein with ILLEGAL_TIME", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 15, adjust: { type: "bronstein", incseconds: 0 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail 0 minutes if there is no increment or delay", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 0 },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should succeed with 0 minutes if there is increment or delay (bronstein)", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 0, adjust: { type: "bronstein", incseconds: 60 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should succeed with 0 minutes if there is increment or delay (us)", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 0, adjust: { type: "us", incseconds: 60 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should succeed with 0 minutes if there is increment or delay (inc)", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 0, adjust: { type: "inc", incseconds: 60 } },
      };
      gameservice.startGameFromChallenge(user, challenge, "x");
      chai.assert.fail("check user");
    });

    it("should fail if minutes is not an integer", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 15.78, adjust: { type: "inc", incseconds: 60 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail if minutes is negative", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: -15, adjust: { type: "inc", incseconds: 60 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail if inc or delay is not an integer (inc)", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 15, adjust: { type: "inc", incseconds: 60.86 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail if inc or delay is not an integer (us)", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 15, adjust: { type: "us", incseconds: 60.86 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail if inc or delay is not an integer (bronestein)", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: {
          minutes: 15,
          adjust: { type: "bronstein", incseconds: 60.86 },
        },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail if inc or delay is negative (bronestein)", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 15, adjust: { type: "bronstein", incseconds: -60 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail if inc or delay is negative (us)", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 15, adjust: { type: "us", incseconds: -60 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail if inc or delay is negative (inc)", function () {
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 15, adjust: { type: "inc", incseconds: -60 } },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challenge, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_TIME"));
    });

    it("should fail skill level is not within 1 and 10", function () {
      const challengeneg: ComputerChallengeRecord = {
        skill_level: -1,
        clock: { minutes: 15 },
      };
      const challengezro: ComputerChallengeRecord = {
        skill_level: -1,
        clock: { minutes: 15 },
      };
      const challengepos: ComputerChallengeRecord = {
        skill_level: -1,
        clock: { minutes: 15 },
      };
      expect(() =>
        gameservice.startGameFromChallenge(user, challengeneg, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_SKILL_LEVEL"));
      expect(() =>
        gameservice.startGameFromChallenge(user, challengezro, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_SKILL_LEVEL"));
      expect(() =>
        gameservice.startGameFromChallenge(user, challengepos, "x"),
      ).to.throw(new Meteor.Error("ILLEGAL_SKILL_LEVEL"));
    });

    it("should succeed in storing a game record (min)", function () {
      const expectedgamerecord: Mongo.OptionalId<ComputerPlayGameRecord> = {
        _id: undefined,
        instance_id: "x",
        connection_id: "x",
        isolation_group: "myisogroup",
        fen: STARTING_POSITION,
        startTime: new Date(),
        tomove: "w",
        status: "computer",
        skill_level: 1,
        opponent: {
          username: "yyusernameyy",
          userid: "idxxid",
          rating: 1600,
          titles: ["GM", "C"],
        },
        opponentcolor: "w",
        clocks: {
          w: { initial: { minutes: 15 }, current: 900000, starttime: 900000 },
          b: { initial: { minutes: 15 }, current: 900000, starttime: 900000 },
        },
        pending: {
          w: { draw: false, adjourn: false, abort: false, takeback: 0 },
          b: { draw: false, adjourn: false, abort: false, takeback: 0 },
        },
        observers: [],
        variations: {
          halfmovetakeback: 0,
          currentmoveindex: 0,
          movelist: [{ variations: [] }],
        },
      };
      const challenge: ComputerChallengeRecord = {
        skill_level: 1,
        clock: { minutes: 15 },
        color: "w",
      };

      gameservice.startGameFromChallenge(user, challenge, "x");
      expect(writabledao.insert.calledOnce).to.be.true;
      const generatedgamerecord = writabledao.insert.getCall(0)
        .args[0] as ComputerPlayGameRecord;
      expectedgamerecord.startTime = generatedgamerecord.startTime;
      expectedgamerecord.clocks.w.starttime =
        generatedgamerecord.clocks.w.starttime;
      expectedgamerecord.clocks.b.starttime =
        generatedgamerecord.clocks.b.starttime;
      expect(generatedgamerecord).to.deep.equal(expectedgamerecord);
    });
  });
});
