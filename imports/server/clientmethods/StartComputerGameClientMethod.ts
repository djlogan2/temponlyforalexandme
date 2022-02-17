import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";
import ConnectionService from "/imports/server/service/ConnectionService";
import GameService from "/imports/server/service/GameService";
import ServerUser from "/lib/server/ServerUser";
import ServerLogger from "/lib/server/ServerLogger";
import Stoppable from "/lib/Stoppable";
import * as util from "util";
import { Meteor } from "meteor/meteor";

interface StartComputerGameClientMethodObject extends ClientCallObject {
  challenge: ComputerChallengeRecord;
}

export default class StartComputerGameClientMethod extends AbstractClientMethod {
  private gameservice: GameService;

  private logger1: ServerLogger;

  constructor(
    parent: Stoppable | null,
    connectionservice: ConnectionService,
    gameservice: GameService,
  ) {
    super(
      parent,
      "startComputerGame",
      ["challenge"],
      ["play_computer_games"],
      connectionservice,
    );
    this.logger1 = new ServerLogger(this, "StartComputerGameClientMethod_js");
    this.gameservice = gameservice;
  }

  protected validatearguments(obj: StartComputerGameClientMethodObject): void {}

  protected called(obj: StartComputerGameClientMethodObject): Promise<string> {
    this.logger1.debug(
      () =>
        `StartComputerGameClientMethodObject challenge=${util.inspect(
          obj.challenge,
        )}`,
    );

    if (!obj.connection) {
      return Promise.reject(new Meteor.Error("NO_CONNECTION"));
    }

    return Promise.resolve(
      this.gameservice.startComputerGame(
        obj.user as ServerUser,
        obj.challenge,
        obj.connection.connectionid,
      ),
    );
  }

  protected stopping() {}
}
