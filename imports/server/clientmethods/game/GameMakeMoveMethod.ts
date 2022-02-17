import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ServerLogger from "/lib/server/ServerLogger";
import ConnectionService from "/imports/server/service/ConnectionService";
import Stoppable from "/lib/Stoppable";
import { Meteor } from "meteor/meteor";
import ServerUser from "/lib/server/ServerUser";
import GameService from "/imports/server/service/GameService";

interface GameMakeMoveMethodObject extends ClientCallObject {
  id: string;
  move: string;
}

export default class GameMakeMoveMethod extends AbstractClientMethod {
  private logger1: ServerLogger;

  private gameservice: GameService;

  constructor(
    parent: Stoppable | null,
    connectionservice: ConnectionService,
    gameservice: GameService,
  ) {
    super(parent, "makeMove", ["id", "move"], [], connectionservice);
    this.logger1 = new ServerLogger(this, "GameMakeMoveMethod_ts");
    this.gameservice = gameservice;
  }

  protected validatearguments(obj: GameMakeMoveMethodObject): void {}

  protected called(obj: GameMakeMoveMethodObject): Promise<any> {
    this.logger1.debug(() => `GameMakeMoveMethod move=${obj.move}`);
    const game = this.gameservice.getTyped(obj.id);
    if (game) {
      game.makeMove(obj.user as ServerUser, obj.move);
    } else return Promise.reject(new Meteor.Error("UNKNOWN_GAME"));
    return Promise.resolve();
  }

  protected stopping() {}
}
