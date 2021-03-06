// eslint-disable-next-line max-classes-per-file
import EventEmitter from "eventemitter3";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import CommonAnalysisGame from "/lib/game/CommonAnalysisGame";
import CommonComputerPlayedGame from "/lib/game/CommonComputerPlayedGame";
import { BasicGameRecord, GameStatus } from "/lib/records/GameRecord";
import sinon from "sinon";
import { Move } from "chess.js";
import User from "/lib/User";
import chai from "chai";
import CommonSingleGameReadOnlyGameDao, {
  GameEvents,
} from "/imports/dao/CommonSingleGameReadOnlyGameDao";
import { PieceColor } from "/lib/records/ChallengeRecord";

class CommonComputerPlayedGameTest extends CommonComputerPlayedGame {
  protected endGame(status: GameStatus, status2: number): void {}

  protected internalMakeMove(
    who: string,
    move: Move,
    fen: string,
    result: GameStatus,
  ): void {}

  protected internalSetDraw(
    who: string,
    color: PieceColor,
    draw: boolean,
    type: "drawdecline" | "drawrevoke" | "drawrequest",
  ): void {
    throw new Error("Method not implemented.");
  }

  protected isAuthorizedToMove(who: User): boolean {
    return true;
  }

  protected playerColor(who: User): PieceColor | null {
    return null;
  }

  // protected internalSetDraw(color: PieceColor, draw: boolean, type): void {
  // }

  protected isClosing(): void {
    throw new Error("Method not implemented.");
  }
}

class CommonReadOnlyGameDaoTest extends CommonSingleGameReadOnlyGameDao {
  public pEvents = new EventEmitter<GameEvents>();

  get events(): BasicEventEmitter<GameEvents> {
    return this.pEvents;
  }

  protected getClassFromType(
    game: BasicGameRecord,
  ): CommonComputerPlayedGame | CommonAnalysisGame {
    const dao = sinon.createStubInstance(CommonSingleGameReadOnlyGameDao);
    return new CommonComputerPlayedGameTest(this, game._id, dao);
  }

  protected onReady(): void {}
}

describe("CommonReadOnlyGameDao", function () {
  describe("constructor", function () {
    it("needs to be tested", function () {
      chai.assert.fail("do me");
    });
  });
  describe("protected onFieldsChanged", function () {
    it("needs to be tested", function () {
      chai.assert.fail("do me");
    });
  });
  describe("protected onRecordAdded", function () {
    it("needs to be tested", function () {
      chai.assert.fail("do me");
    });
  });
  describe("protected onRecordRemoved", function () {
    it("needs to be tested", function () {
      chai.assert.fail("do me");
    });
  });
  describe("protected abstract getClassFromType", function () {
    it("needs to be tested", function () {
      chai.assert.fail("do me");
    });
  });
});
