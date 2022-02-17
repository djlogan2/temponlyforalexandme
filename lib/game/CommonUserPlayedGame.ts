import CommonPlayedGame from "/lib/game/CommonPlayedGame";
import { TwoPlayerPlayedGameRecord } from "/lib/records/GameRecord";
import { Meteor } from "meteor/meteor";

export default abstract class CommonUserPlayedGame extends CommonPlayedGame {
  protected get me(): TwoPlayerPlayedGameRecord {
    if (super.me.status !== "playing") throw new Meteor.Error("INVALID_TYPE");
    return super.me as TwoPlayerPlayedGameRecord;
  }
}
