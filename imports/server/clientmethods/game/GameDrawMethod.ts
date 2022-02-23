import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ServerLogger from "/lib/server/ServerLogger";
import ConnectionService from "/imports/server/service/ConnectionService";
import Stoppable from "/lib/Stoppable";
import { Meteor } from "meteor/meteor";
import ServerUser from "/lib/server/ServerUser";
import GameService from "/imports/server/service/GameService";

interface GameDrawMethodObject extends ClientCallObject {
  id: string;
}

export default class GameDrawMethod extends AbstractClientMethod {
  private logger1: ServerLogger;

  private gameservice: GameService;

  constructor(
    parent: Stoppable | null,
    connectionservice: ConnectionService,
    gameservice: GameService,
  ) {
    super(parent, "draw", ["id"], [], connectionservice);
    this.logger1 = new ServerLogger(this, "GameResignMethod_ts");
    this.gameservice = gameservice;
  }

  protected validatearguments(obj: GameDrawMethodObject): void {}

  protected called(obj: GameDrawMethodObject): Promise<any> {
    this.logger1.trace(() => `GameDrawMethodObject`);
    const game = this.gameservice.getTyped(obj.id);
    if (game && "draw" in game) {
      game.draw(obj.user as ServerUser);
    } else return Promise.reject(new Meteor.Error("UNKNOWN_GAME"));
    return Promise.resolve();
  }

  protected stopping() {}
}
