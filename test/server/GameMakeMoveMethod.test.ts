import ConnectionService from "/imports/server/service/ConnectionService";
import sinon from "sinon";
import { expect } from "chai";
import { Meteor } from "meteor/meteor";
import GameService from "/imports/server/service/GameService";
import GameMethods from "/imports/server/clientmethods/game/GameMethods";

const sandbox = sinon.createSandbox();

describe("GameMakeMoveMethod", function () {
  afterEach(() => {
    sandbox.restore();
  });
  it("should fail with UNKNOWN_GAME if called is passed an invalid id", function (done) {
    const connectionservice = sandbox.createStubInstance(ConnectionService);
    const gameservice = sandbox.createStubInstance(GameService);
    gameservice.getTyped.returns(undefined); // .alwaysReturned(game);
    sandbox.stub(Meteor, "methods");
    const method = new GameMethods(null, connectionservice, gameservice); // sandbox.createStubInstance(GameMakeMoveMethod);
    method
      // @ts-ignore
      .called("x", "x")
      .then(() => {
        done(new Error("Expected an exception"));
      })
      .catch((err) => {
        done(expect(err.message).to.equal("UNKNOWN_GAME"));
      });
    // expect(() => method.called("x", "x")).to.throw("UNKNOWN_GAME");
    sandbox.restore();
  });
  it("should work if called is passed a ServerAnalysisGame", function () {
    const connectionservice = sandbox.createStubInstance(ConnectionService);
    const gameservice = sandbox.createStubInstance(GameService);
    gameservice.getTyped.returns(undefined); // .alwaysReturned(game);
    sandbox.stub(Meteor, "methods");
    const method = new GameMethods(null, connectionservice, gameservice); // sandbox.createStubInstance(GameMakeMoveMethod);
    // @ts-ignore
    method.called({
      id: "x",
      data: {
        type: "move",
        move: "x",
      },
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
    const method = new GameMethods(null, connectionservice, gameservice); // sandbox.createStubInstance(GameMakeMoveMethod);
    // @ts-ignore
    method.called({
      id: "x",
      data: {
        type: "move",
        move: "x",
      },
      httpHeaders: { "user-agent": "x", "accept-language": "x" },
    });
    // @ts-ignore
    expect(game.makeMove.calledOnce).to.be.true;
    sandbox.restore();
  });
});
