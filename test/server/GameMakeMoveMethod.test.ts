import GameMakeMoveMethod from "/imports/server/clientmethods/GameMakeMoveMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import sinon from "sinon";
import { expect } from "chai";
import ServerAnalysisGame from "/lib/server/game/ServerAnalysisGame";
import User from "/lib/User";
import ServerComputerPlayedGame from "/lib/server/game/ServerComputerPlayedGame";
import { Meteor } from "meteor/meteor";

const sandbox = sinon.createSandbox();

describe.only("GameMakeMoveMethod", function () {
  afterEach(() => {
    sandbox.restore();
  });
  it("should fail with UNKNOWN_GAME if called is passed an invalid id", function () {
    const connectionservice = sandbox.createStubInstance(ConnectionService);
    const readonlydao = sandbox.createStubInstance(CommonReadOnlyGameDao);
    readonlydao.getTyped.returns(undefined); // .alwaysReturned(game);
    sandbox.stub(Meteor, "methods");
    const method = new GameMakeMoveMethod(null, connectionservice, readonlydao); // sandbox.createStubInstance(GameMakeMoveMethod);
    // @ts-ignore
    expect(() => method.called("x", "x")).to.throw("UNKNOWN_GAME");
    sandbox.restore();
  });
  it("should work if called is passed a ServerAnalysisGame", function () {
    this.timeout(5000000);
    const connectionservice = sandbox.createStubInstance(ConnectionService);
    const readonlydao = sandbox.createStubInstance(CommonReadOnlyGameDao);
    const game = sandbox.createStubInstance(ServerAnalysisGame);
    sandbox.stub(Meteor, "methods");
    readonlydao.getTyped.returns(game); // .alwaysReturned(game);
    const method = new GameMakeMoveMethod(null, connectionservice, readonlydao); // sandbox.createStubInstance(GameMakeMoveMethod);
    // @ts-ignore
    method.called({
      id: "x",
      move: "x",
      httpHeaders: { "user-agent": "x", "accept-language": "x" },
    });
    // @ts-ignore
    expect(game.makeMove.calledOnce).to.be.true;
    sandbox.restore();
  });
  it("should work if called is passed a ServerComputerPlayedGame", function () {
    const connectionservice = sandbox.createStubInstance(ConnectionService);
    const readonlydao = sandbox.createStubInstance(CommonReadOnlyGameDao);
    const game = sandbox.createStubInstance(ServerComputerPlayedGame);
    sandbox.stub(Meteor, "methods");
    readonlydao.getTyped.returns(game); // .alwaysReturned(game);
    const method = new GameMakeMoveMethod(null, connectionservice, readonlydao); // sandbox.createStubInstance(GameMakeMoveMethod);
    // @ts-ignore
    method.called({
      id: "x",
      move: "x",
      httpHeaders: { "user-agent": "x", "accept-language": "x" },
    });
    // @ts-ignore
    expect(game.makeMove.calledOnce).to.be.true;
    sandbox.restore();
  });
});
