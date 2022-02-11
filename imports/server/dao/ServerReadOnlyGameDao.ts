import CommonReadOnlyGameDao, {
  GameEvents,
} from "/imports/dao/CommonReadOnlyGameDao";
import EventEmitter from "eventemitter3";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import {
  BasicGameRecord,
  ComputerPlayGameRecord,
} from "/lib/records/GameRecord";
import CommonComputerPlayedGame from "/lib/CommonComputerPlayedGame";
import CommonAnalysisGame from "/lib/CommonAnalysisGame";
import ServerAnalysisGame from "/lib/server/ServerAnalysisGame";
import ServerComputerPlayedGame from "/lib/server/ServerComputerPlayedGame";
import { Meteor } from "meteor/meteor";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import Stoppable from "/lib/Stoppable";

export default class ServerReadOnlyGameDao extends CommonReadOnlyGameDao {
  private pEvents = new EventEmitter<GameEvents>();

  private writabledao: WritableGameDao;

  constructor(parent: Stoppable | null, writabledao: WritableGameDao) {
    super(parent);
    this.writabledao = writabledao;
    this.start({});
  }

  public get events(): BasicEventEmitter<GameEvents> {
    return this.pEvents;
  }

  protected getClassFromType(
    game: BasicGameRecord,
  ): CommonComputerPlayedGame | CommonAnalysisGame {
    switch (game.status) {
      case "playing":
        throw new Meteor.Error("NOT_IMPLEMENTED");
      case "analyzing":
        return new ServerAnalysisGame(this, game, this);
      case "computer":
        return new ServerComputerPlayedGame(
          this,
          game as ComputerPlayGameRecord,
          this,
          this.writabledao,
        );
      default: {
        const checkme: never = game.status;
        throw new Error(`UNKNOWN_GAME_RECORD_TYPE: ${checkme}`);
      }
    }
  }
}
