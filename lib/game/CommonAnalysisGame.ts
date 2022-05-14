import { Meteor } from "meteor/meteor";
import CommonBasicGame from "/lib/game/CommonBasicGame";
import { AnalysisGameRecord, GameStatus } from "/lib/records/GameRecord";
import User from "/lib/User";

export default abstract class CommonAnalysisGame extends CommonBasicGame {
  protected premoveTasks(): void {}

  protected postmoveTasks(): void {}

  protected get me(): AnalysisGameRecord {
    const r = super.me;
    if (r.status !== "analyzing") throw new Meteor.Error("INVALID_TYPE");
    return r as AnalysisGameRecord;
  }

  protected abstract internalSetFen(who: string, fen: string): void;

  public setFen(who: string, fen: string): void {
    this.internalSetFen(who, fen);
  }

  protected endGame(status: GameStatus, status2: number) {
    // By default, an analyzed game does not have to ever "end"
    // But anyone can override this if they wish to know when a game enters this state.
  }
}
