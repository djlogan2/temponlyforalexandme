import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import GameService from "/imports/server/service/GameService";
import ServerLogger from "/lib/server/ServerLogger";
import ConnectionService from "/imports/server/service/ConnectionService";
import Stoppable from "/lib/Stoppable";
import CommonPlayedGame from "/lib/CommonPlayedGame";
import { Meteor } from "meteor/meteor";
import ServerUser from "/lib/server/ServerUser";

interface GameMakeMoveMethodObject extends ClientCallObject {
  id: string;
  move: string;
}

export default class GameMakeMoveMethod extends AbstractClientMethod {
  private gameservice: GameService;

  private logger: ServerLogger;

  constructor(
    parent: Stoppable | null,
    connectionservice: ConnectionService,
    gameservice: GameService,
  ) {
    super(parent, "makeMove", ["id", "move"], [], connectionservice);
    this.logger = new ServerLogger(this, "StartComputerGameClientMethod_js");
    this.gameservice = gameservice;
  }

  protected validatearguments(obj: GameMakeMoveMethodObject): void {}

  protected called(obj: GameMakeMoveMethodObject) {
    this.logger.debug(() => `GameMakeMoveMethod move=${obj.move}`);
    const game = this.gameservice.getTyped(obj.id);
    if (game && game instanceof CommonPlayedGame) {
      game.makeMove(obj.user as ServerUser, obj.move);
    } else throw new Meteor.Error("UNKNOWN_GAME");
  }

  protected stopping() {}
}
