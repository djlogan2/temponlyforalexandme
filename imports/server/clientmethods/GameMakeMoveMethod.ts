import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ServerLogger from "/lib/server/ServerLogger";
import ConnectionService from "/imports/server/service/ConnectionService";
import Stoppable from "/lib/Stoppable";
import CommonPlayedGame from "/lib/game/CommonPlayedGame";
import { Meteor } from "meteor/meteor";
import ServerUser from "/lib/server/ServerUser";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import CommonBasicGame from "/lib/game/CommonBasicGame";

interface GameMakeMoveMethodObject extends ClientCallObject {
  id: string;
  move: string;
}

export default class GameMakeMoveMethod extends AbstractClientMethod {
  private dao: CommonReadOnlyGameDao;

  private logger1: ServerLogger;

  constructor(
    parent: Stoppable | null,
    connectionservice: ConnectionService,
    dao: CommonReadOnlyGameDao,
  ) {
    super(parent, "makeMove", ["id", "move"], [], connectionservice);
    this.logger1 = new ServerLogger(this, "StartComputerGameClientMethod_js");
    this.dao = dao;
  }

  protected validatearguments(obj: GameMakeMoveMethodObject): void {}

  protected called(obj: GameMakeMoveMethodObject): Promise<any> {
    this.logger1.debug(() => `GameMakeMoveMethod move=${obj.move}`);
    const game = this.dao.getTyped(obj.id);
    if (game) {
      game.makeMove(obj.user as ServerUser, obj.move);
    } else return Promise.reject(new Meteor.Error("UNKNOWN_GAME"));
    return Promise.resolve();
  }

  protected stopping() {}
}
