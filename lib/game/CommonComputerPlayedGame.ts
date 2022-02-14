import CommonPlayedGame from "/lib/game/CommonPlayedGame";
import { PieceColor } from "/lib/records/ChallengeRecord";
import User from "/lib/User";
import { ComputerPlayGameRecord } from "/lib/records/GameRecord";

export default abstract class CommonComputerPlayedGame extends CommonPlayedGame {
  protected get me(): ComputerPlayGameRecord {
    return super.me as ComputerPlayGameRecord;
  }

  protected playerColor(who: User): PieceColor | null {
    return this.me.opponent.userid === who.id ? this.me.opponentcolor : null;
  }
}
