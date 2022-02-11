import {
  BasicGameRecord,
  ComputerPlayGameRecord,
} from "/lib/records/GameRecord";
import Stoppable from "/lib/Stoppable";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import CommonComputerPlayedGame from "/lib/CommonComputerPlayedGame";
import CommonAnalysisGame from "/lib/CommonAnalysisGame";

export type GameEvents =
  | "started"
  | "move"
  | "fen"
  | "clockchanged"
  | "movemade";
export default abstract class CommonReadOnlyGameDao extends ReactiveReadOnlyDao<BasicGameRecord> {
  public abstract get events(): BasicEventEmitter<GameEvents>;

  constructor(parent: Stoppable | null) {
    super(parent, "games");
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<ComputerPlayGameRecord>,
  ): void {
    if (record.fen) {
      this.events.emit("fen", record.fen);
    }

    if (record.clocks) {
      if (record.clocks.w) {
        if (record.clocks.w.current) {
          this.events.emit("clockchanged", "w", record.clocks.w.current);
        }
      }
      if (record.clocks.b) {
        if (record.clocks.b.current) {
          this.events.emit("clockchanged", "b", record.clocks.b.current);
        }
      }
    }

    if (record.variations) {
      if (record.variations.movelist) {
        this.events.emit(
          "movemade",
          record.variations.movelist[record.variations.currentmoveindex],
        );
      } else {
        const game = this.getTyped(id) as unknown as ComputerPlayGameRecord;
        this.events.emit(
          "movemade",
          game.variations.movelist[record.variations.currentmoveindex],
        );
      }
    }
  }

  protected onRecordAdded(id: string, record: Partial<BasicGameRecord>): void {
    this.events.emit("started", this.getTyped(id));
  }

  protected onRecordRemoved(id: string): void {}

  protected abstract getClassFromType(
    game: BasicGameRecord,
  ): CommonComputerPlayedGame | CommonAnalysisGame;

  public getTyped(
    id: string,
  ): CommonComputerPlayedGame | CommonAnalysisGame | undefined {
    const game = this.get(id);
    if (!game) return undefined;
    return this.getClassFromType(game);
  }
}
