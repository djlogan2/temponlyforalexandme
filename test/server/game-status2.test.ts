import chai, { expect } from "chai";
import CommonPlayedGame from "/lib/game/CommonPlayedGame";
import CommonSingleGameReadOnlyGameDao from "/imports/dao/CommonSingleGameReadOnlyGameDao";
import sinon, { SinonSandbox, SinonStubbedInstance } from "sinon";
import { ECOObject, GameStatus } from "/lib/records/GameRecord";
import { Chess, Move } from "chess.js";
import { PieceColor } from "/lib/records/ChallengeRecord";
import User from "/lib/User";
import Stoppable from "/lib/Stoppable";

class TestCommonPlayedGame extends CommonPlayedGame {
  public color: PieceColor;

  public status?: GameStatus;

  public status2?: number;

  constructor(
    parent: Stoppable | null,
    id: string,
    dao: CommonSingleGameReadOnlyGameDao,
    color: PieceColor,
  ) {
    super(parent, id, dao);
    this.color = color;
  }

  public startClock() {}

  protected endGame(status: GameStatus, status2: number): void {
    if (this.status !== undefined)
      throw new Error("status already defined -- game already ended");
    this.status = status;
    this.status2 = status2;
  }

  protected internalMakeMove(
    move: Move,
    fen: string,
    result: GameStatus,
    result2: number,
    eco: ECOObject,
  ): void {}

  protected internalSetDraw(color: PieceColor, draw: boolean): void {}

  protected isAuthorizedToMove(who: User): boolean {
    return true;
  }

  protected playerColor(who: User): PieceColor | null {
    return this.color;
  }

  protected isClosing(): void {}
}

describe("status2 values", function () {
  let sandbox: SinonSandbox;
  let readonlydao: SinonStubbedInstance<CommonSingleGameReadOnlyGameDao>;
  let user: User;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    readonlydao = sandbox.createStubInstance(CommonSingleGameReadOnlyGameDao);
    user = sandbox.createStubInstance(User);
  });

  afterEach(function () {
    sandbox.restore();
    globalThis.ICCServer.games = {};
  });

  it("should record status2 of zero when white resigns", function () {
    const playedgame = new TestCommonPlayedGame(null, "x", readonlydao, "w");
    playedgame.resign(user);
    expect(playedgame.status).to.equal("0-1");
    expect(playedgame.status2).to.equal(0);
  });

  it("should record status2 of zero when black resigns", function () {
    const playedgame = new TestCommonPlayedGame(null, "x", readonlydao, "b");
    playedgame.resign(user);
    expect(playedgame.status).to.equal("1-0");
    expect(playedgame.status2).to.equal(0);
  });

  it("should record status2 of 1 when black is checkmated", function () {
    const playedgame = new TestCommonPlayedGame(null, "x", readonlydao, "b");
    globalThis.ICCServer.games.x = {
      chessObject: new Chess(
        "rnbqkbnr/ppppp2p/5p2/6p1/8/3PP3/PPP2PPP/RNBQKBNR w KQkq g6 0 3",
      ),
    };
    playedgame.makeMove(user, "Qh5");
    expect(playedgame.status).to.equal("1-0");
    expect(playedgame.status2).to.equal(1);
  });

  it("should record status2 of 1 when white is checkmated", function () {
    const playedgame = new TestCommonPlayedGame(null, "x", readonlydao, "b");
    globalThis.ICCServer.games.x = {
      chessObject: new Chess(
        "rnbqkbnr/pppp1ppp/4p3/8/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq g3 0 2",
      ),
    };
    playedgame.makeMove(user, "Qh4");
    expect(playedgame.status).to.equal("0-1");
    expect(playedgame.status2).to.equal(1);
  });

  it("should record status2 of 2 when white runs out of time", function () {
    chai.assert.fail("do me");
  });

  it("should record status2 of 2 when black runs out of time", function () {
    chai.assert.fail("do me");
  });

  it.skip("should record status2 of 3 when the game is adjudicated for white", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 3 when the game is adjudicated for black", function () {
    chai.assert.fail("do me");
  });

  it("should record status2 of 4 when white disconnects and forfeits", function () {
    chai.assert.fail("do me");
  });
  it("should record status2 of 4 when black disconnects and forfeits", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 5 when white gets disconnected and forfeits", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 5 when black gets disconnected and forfeits", function () {
    chai.assert.fail("do me");
  });

  it("should record status2 of 13 when the game is drawn by mutual agreement", function () {
    chai.assert.fail("do me");
  });

  it("should record status2 of 14 when white gets stalemated", function () {
    const playedgame = new TestCommonPlayedGame(null, "x", readonlydao, "b");
    globalThis.ICCServer.games.x = {
      chessObject: new Chess(
        "rn2k1nr/pp4pp/3p4/q1pP1p2/P1P4b/1b2pPRP/1P1NP1PQ/2B1KBNR b Kkq c3 0 12",
      ),
    };
    playedgame.makeMove(user, "f4");
    expect(playedgame.status).to.equal("1/2-1/2");
    expect(playedgame.status2).to.equal(14);
  });

  it("should record status2 of 14 when black gets stalemated", function () {
    const playedgame = new TestCommonPlayedGame(null, "x", readonlydao, "b");
    globalThis.ICCServer.games.x = {
      chessObject: new Chess(
        "2Q2bnr/4p1pq/5pkr/7p/7P/4P3/PPPP1PP1/RNB1KBNR w KQ - 1 10",
      ),
    };
    playedgame.makeMove(user, "Qe6");
    expect(playedgame.status).to.equal("1/2-1/2");
    expect(playedgame.status2).to.equal(14);
  });

  it("should record status2 of 15 when there is a draw by repetition", function () {
    const playedgame = new TestCommonPlayedGame(null, "x", readonlydao, "b");
    const chess = new Chess();
    ["Nf3", "Nf6", "Ng1", "Ng8", "Nf3", "Nf6", "Ng1", "Ng8", "Nf3"].forEach(
      (move) => chess.move(move),
    );
    globalThis.ICCServer.games.x = { chessObject: chess };
    playedgame.makeMove(user, "Nf6");
    expect(playedgame.status).to.equal("1/2-1/2");
    expect(playedgame.status2).to.equal(15);
  });

  function argh(move: string): boolean {
    return (
      ["B", "R", "K", "Q", "N"].some((pc) => move.startsWith(pc)) &&
      move.indexOf("x") === -1 &&
      move.indexOf("+") === -1 &&
      move.indexOf("#") === -1
    );
  }

  it("should record status2 of 16 when white draws by the 50 move rule", function () {
    const playedgame = new TestCommonPlayedGame(null, "x", readonlydao, "b");

    globalThis.ICCServer.games.x = { chessObject: new Chess() };

    playedgame.makeMove(user, "e3");
    playedgame.makeMove(user, "e6");

    for (let x = 0; x < 49 * 2 + 1; x += 1) {
      const poss = globalThis.ICCServer.games.x.chessObject
        .moves()
        .filter(argh);
      const which = Math.round(Math.random() * (poss.length - 1));
      playedgame.makeMove(user, poss[which]);
    }

    const poss = globalThis.ICCServer.games.x.chessObject.moves().filter(argh);
    const which = Math.round(Math.random() * (poss.length - 1));
    playedgame.makeMove(user, poss[which]);

    expect(playedgame.status).to.equal("1/2-1/2");
    expect(playedgame.status2).to.equal(16);
  });

  it("should record status2 of 16 when black draws by the 50 move rule", function () {
    const playedgame = new TestCommonPlayedGame(null, "x", readonlydao, "b");

    globalThis.ICCServer.games.x = { chessObject: new Chess() };

    playedgame.makeMove(user, "e3");
    playedgame.makeMove(user, "e6");
    playedgame.makeMove(user, "a4");

    for (let x = 0; x < 49 * 2 + 1; x += 1) {
      const poss = globalThis.ICCServer.games.x.chessObject
        .moves()
        .filter(argh);
      const which = Math.round(Math.random() * (poss.length - 1));
      playedgame.makeMove(user, poss[which]);
    }

    const poss = globalThis.ICCServer.games.x.chessObject.moves().filter(argh);
    const which = Math.round(Math.random() * (poss.length - 1));
    playedgame.makeMove(user, poss[which]);

    expect(playedgame.status).to.equal("1/2-1/2");
    expect(playedgame.status2).to.equal(16);
  });

  it.skip("should record status2 of 17 when white ran out of time without black having mating material", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 17 when black ran out of time without white having mating material", function () {
    chai.assert.fail("do me");
  });
  it("should record status2 of 18 when neither player has mating material", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 20 when game is drawn by adjudication", function () {
    chai.assert.fail("do me");
  });
  it("should record status2 of 24 when game is adjourned by mutual agreement", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 26 when game is adjourned by sytem shutdown", function () {
    chai.assert.fail("do me");
  });
  it("should record status2 of 30 when game is aborted by mutual agreement", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 31 when white disconnected and game was aborted", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 31 when black disconnected and game was aborted", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 32 game aborted by system shutdown (in game_history, not game)", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 34 when game is aborted by administrator", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 35 when game is aborted because it's too short to adjourn", function () {
    chai.assert.fail("do me");
  });
  it("should record status2 of 37 when white aborted at move 1", function () {
    chai.assert.fail("do me");
  });
  it("should record status2 of 37 when black aborted at move 1", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 41 when white got disconnected and game was aborted", function () {
    chai.assert.fail("do me");
  });
  it.skip("should record status2 of 41 when black got disconnected and game was aborted", function () {
    chai.assert.fail("do me");
  });
});
