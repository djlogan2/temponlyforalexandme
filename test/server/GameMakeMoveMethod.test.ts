import GameMakeMoveMethod from "/imports/server/clientmethods/GameMakeMoveMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import sinon from "sinon";
import { expect } from "chai";
import { Meteor } from "meteor/meteor";
import GameService from "/imports/server/service/GameService";

const sandbox = sinon.createSandbox();

describe("GameMakeMoveMethod", function () {
  afterEach(() => {
    sandbox.restore();
  });
  it("should fail with UNKNOWN_GAME if called is passed an invalid id", function () {
    const connectionservice = sandbox.createStubInstance(ConnectionService);
    const gameservice = sandbox.createStubInstance(GameService);
    gameservice.getTyped.returns(undefined); // .alwaysReturned(game);
    sandbox.stub(Meteor, "methods");
    const method = new GameMakeMoveMethod(null, connectionservice, gameservice); // sandbox.createStubInstance(GameMakeMoveMethod);
    // @ts-ignore
    expect(() => method.called("x", "x")).to.throw("UNKNOWN_GAME");
    sandbox.restore();
  });
  it("should work if called is passed a ServerAnalysisGame", function () {
    const connectionservice = sandbox.createStubInstance(ConnectionService);
    const gameservice = sandbox.createStubInstance(GameService);
    gameservice.getTyped.returns(undefined); // .alwaysReturned(game);
    sandbox.stub(Meteor, "methods");
    const method = new GameMakeMoveMethod(null, connectionservice, gameservice); // sandbox.createStubInstance(GameMakeMoveMethod);
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
    const gameservice = sandbox.createStubInstance(GameService);
    gameservice.getTyped.returns(undefined); // .alwaysReturned(game);
    sandbox.stub(Meteor, "methods");
    const method = new GameMakeMoveMethod(null, connectionservice, gameservice); // sandbox.createStubInstance(GameMakeMoveMethod);
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
