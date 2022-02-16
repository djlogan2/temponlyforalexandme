import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ServerLogger from "/lib/server/ServerLogger";
import ConnectionService from "/imports/server/service/ConnectionService";
import Stoppable from "/lib/Stoppable";
import { Meteor } from "meteor/meteor";
import ServerUser from "/lib/server/ServerUser";
import GameService from "/imports/server/service/GameService";

interface GameResignMethodObject extends ClientCallObject {
  id: string;
}

export default class GameResignMethod extends AbstractClientMethod {
  private logger1: ServerLogger;

  private gameservice: GameService;

  constructor(
    parent: Stoppable | null,
    connectionservice: ConnectionService,
    gameservice: GameService,
  ) {
    super(parent, "resign", ["id"], [], connectionservice);
    this.logger1 = new ServerLogger(this, "GameResignMethod_ts");
    this.gameservice = gameservice;
  }

  protected validatearguments(obj: GameResignMethodObject): void {}

  protected called(obj: GameResignMethodObject): Promise<any> {
    this.logger1.debug(() => `GameResignMethod`);
    const game = this.gameservice.getTyped(obj.id);
    if (game && "resign" in game) {
      game.resign(obj.user as ServerUser);
    } else return Promise.reject(new Meteor.Error("UNKNOWN_GAME"));
    return Promise.resolve();
  }

  protected stopping() {}
}
