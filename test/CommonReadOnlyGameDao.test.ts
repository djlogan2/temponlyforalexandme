// eslint-disable-next-line max-classes-per-file
import CommonReadOnlyGameDao, {
  GameEvents,
} from "/imports/dao/CommonReadOnlyGameDao";
import EventEmitter from "eventemitter3";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import CommonAnalysisGame from "/lib/game/CommonAnalysisGame";
import CommonComputerPlayedGame from "/lib/game/CommonComputerPlayedGame";
import {
  BasicGameRecord,
  ComputerPlayGameRecord,
  GameStatus,
} from "/lib/records/GameRecord";
import sinon from "sinon";
import { Move } from "chess.js";
import User from "/lib/User";
import chai from "chai";

class CommonComputerPlayedGameTest extends CommonComputerPlayedGame {
  protected endGame(status: GameStatus, status2: number): void {}

  protected internalMakeMove(
    move: Move,
    fen: string,
    result: GameStatus,
  ): void {}

  protected isAuthorizedToMove(who: User): boolean {
    return true;
  }
}

class CommonReadOnlyGameDaoTest extends CommonReadOnlyGameDao {
  public pEvents = new EventEmitter<GameEvents>();

  get events(): BasicEventEmitter<GameEvents> {
    return this.pEvents;
  }

  protected getClassFromType(
    game: BasicGameRecord,
  ): CommonComputerPlayedGame | CommonAnalysisGame {
    const dao = sinon.createStubInstance(CommonReadOnlyGameDao);
    return new CommonComputerPlayedGameTest(
      this,
      game as ComputerPlayGameRecord,
      dao,
    );
  }
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
