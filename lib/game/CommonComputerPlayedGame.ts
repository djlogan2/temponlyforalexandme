import CommonPlayedGame from "/lib/game/CommonPlayedGame";
import { ComputerPlayGameRecord } from "/lib/records/GameRecord";
import { Meteor } from "meteor/meteor";

export default abstract class CommonComputerPlayedGame extends CommonPlayedGame {
  protected get me(): ComputerPlayGameRecord {
    if (super.me.status !== "computer") throw new Meteor.Error("INVALID_TYPE");
    return super.me as ComputerPlayGameRecord;
  }
}
