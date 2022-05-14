import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import Stoppable from "/lib/Stoppable";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import GameService from "/imports/server/service/GameService";
import CommonPlayedGame from "/lib/game/CommonPlayedGame";
import CommonAnalysisGame from "/lib/game/CommonAnalysisGame";

export type GameMethodType = "draw" | "move" | "resign" | "setfen";

interface GameMethodData {}

interface GameMoveMethodData extends GameMethodData {
  type: "move";
  move: string;
}

interface GameIdOnlyData extends GameMethodData {
  type: "draw" | "resign";
}

interface GameSetFenData extends GameMethodData {
  type: "setfen";
  fen: string;
}

interface GameCallObject extends ClientCallObject {
  id: string;
  data: GameMoveMethodData | GameIdOnlyData | GameSetFenData;
}

export default class GameMethods extends AbstractClientMethod {
  private gameservice: GameService;

  constructor(
    parent: Stoppable | null,
    connectionservice: ConnectionService,
    gameservice: GameService,
  ) {
    super(parent, "gamecommand", ["id", "data"], [], connectionservice);
    this.gameservice = gameservice;
  }

  protected validatearguments(obj: GameCallObject): void {
    const stupid = obj.data.type;

    check(obj.id, String);

    switch (stupid) {
      case "move":
        check(obj.data.move, String);
        break;
      case "draw":
      case "resign":
        break;
      case "setfen":
        check(obj.data.fen, String);
        break;
      default: {
        // noinspection UnnecessaryLocalVariableJS
        const checkme: never = stupid;
        throw new Meteor.Error("INVALID_TYPE", checkme);
      }
    }
  }

  protected called(obj: GameCallObject): Promise<any> {
    return new Promise((resolve, reject) => {
      let game;

      if (!obj.user) {
        reject(new Meteor.Error("INVALID_USER"));
        return;
      }

      const stupid = obj.data.type;

      switch (stupid) {
        case "move":
          game = this.gameservice.getTyped(obj.id);
          if (!game) {
            reject(new Meteor.Error("INVALID_GAME"));
            return;
          }
          game.makeMove(obj.user, obj.data.move);
          break;
        case "draw":
          game = this.gameservice.getTyped(obj.id);
          if (!(game instanceof CommonPlayedGame)) {
            reject(new Meteor.Error("INVALID_COMMAND"));
            return;
          }
          game.draw(obj.user);
          break;
        case "resign":
          game = this.gameservice.getTyped(obj.id);
          if (!(game instanceof CommonPlayedGame)) {
            reject(new Meteor.Error("INVALID_COMMAND"));
            return;
          }
          game.resign(obj.user);
          break;
        case "setfen":
          game = this.gameservice.getTyped(obj.id);
          if (!(game instanceof CommonAnalysisGame)) {
            reject(new Meteor.Error("INVALID_COMMAND"));
            return;
          }
          game.setFen(obj.user.id, obj.data.fen);
          break;
        default: {
          // noinspection UnnecessaryLocalVariableJS
          const checkme: never = stupid;
          reject(new Meteor.Error("INVALID_TYPE", checkme));
        }
      }
    });
  }

  protected stopping(): void {
    throw new Error("Method not implemented.");
  }
}
