import {
  BasicGameRecord,
  ComputerPlayGameRecord,
} from "/lib/records/GameRecord";
import Stoppable from "/lib/Stoppable";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import { Meteor } from "meteor/meteor";
import { PieceColor } from "/lib/records/ChallengeRecord";

export type GameEvents =
  | "abortrequested"
  | "abortremoved"
  | "adjournrequested"
  | "adjournremoved"
  | "drawrequested"
  | "drawremoved"
  | "move"
  | "fen"
  | "clockchanged"
  | "clockstarted"
  | "clockstopped"
  | "converted"
  | "movemade"
  | "ended";
export default abstract class CommonSingleGameReadOnlyGameDao extends ReactiveReadOnlyDao<BasicGameRecord> {
  protected id: string;

  public abstract get events(): BasicEventEmitter<GameEvents>;

  constructor(parent: Stoppable | null, id: string) {
    super(parent, "games");
    this.id = id;
    this.start({ _id: id });
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<ComputerPlayGameRecord>,
  ): void {
    if (record.status) {
      this.events.emit("converted");
    }

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

    if (record.pending) {
      const argh = record.pending;
      ["w", "b"].forEach((color) => {
        const flags = argh[color as PieceColor];
        ["draw"].forEach((type) => {
          if (type in flags) {
            this.events.emit(
              (type +
                (flags[type as "draw" | "abort" | "adjourn"]
                  ? "requested"
                  : "removed")) as GameEvents,
              color,
            );
          }
        });
      });
    }

    if (record.variations) {
      if (record.variations.movelist) {
        this.events.emit(
          "movemade",
          record.variations.movelist[record.variations.currentmoveindex],
        );
      } else {
        const game = this.get(id);
        if (!game) throw new Meteor.Error("UNABLE_TO_FIND_GAME");
        this.events.emit(
          "movemade",
          game.variations.movelist[record.variations.currentmoveindex],
        );
      }
    }
  }

  protected onRecordAdded(id: string, record: Partial<BasicGameRecord>): void {}

  protected onRecordRemoved(id: string): void {
    this.events.emit("ended");
  }
}
