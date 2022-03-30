import {
  BasicGameRecord,
  ComputerPlayGameRecord,
} from "/lib/records/GameRecord";
import Stoppable from "/lib/Stoppable";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import { Meteor } from "meteor/meteor";
import { PieceColor } from "/lib/records/ChallengeRecord";
import CommonLogger from "/lib/logger/CommonLogger";
import * as util from "util";
import { Random } from "meteor/random";

export type GameEvents =
  | "abortremoved"
  | "abortrequested"
  | "adjournremoved"
  | "adjournrequested"
  | "clockchanged"
  | "clocks"
  | "clockstarted"
  | "clockstopped"
  | "converted"
  | "drawremoved"
  | "drawrequested"
  | "ended"
  | "fen"
  | "move"
  | "movelist"
  | "ready"
  | "tomove";
export default abstract class CommonSingleGameReadOnlyGameDao extends ReactiveReadOnlyDao<BasicGameRecord> {
  protected id: string;

  private logger: CommonLogger;

  private hash: string;

  public abstract get events(): BasicEventEmitter<GameEvents>;

  constructor(parent: Stoppable | null, id: string) {
    super(parent, "games");
    this.logger = globalThis.ICCServer.utilities.getLogger(
      this,
      "CommonSingleGameReadOnlyDao_ts",
    );
    this.id = id;
    this.hash = Random.hexString(16);
    this.logger.debug(() => `constructor [${this.hash}]`);
    this.start({ _id: id });
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<ComputerPlayGameRecord>,
  ): void {
    this.logger.debug(
      () =>
        `[${this.hash}] onFieldsChanged id=${id} record=${util.inspect(
          record,
        )}`,
    );
    if (record.status) {
      this.events.emit("converted");
    }

    if (record.fen) {
      this.events.emit("fen", record.fen);
    }

    if (record.tomove) {
      this.events.emit("tomove", record.tomove);
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

      if (record.clocks) {
        this.events.emit("clocks", record.clocks);
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
          "move",
          record.variations.movelist[record.variations.currentmoveindex],
        );
      } else {
        const game = this.get(id);
        if (!game) throw new Meteor.Error("UNABLE_TO_FIND_GAME");
        this.events.emit(
          "move",
          game.variations.movelist[record.variations.currentmoveindex],
        );
      }
    }

    if (record.variations) {
      this.events.emit("movelist", record.variations);
    }
  }

  protected onRecordAdded(id: string, record: Partial<BasicGameRecord>): void {
    this.logger.debug(
      () =>
        `[${this.hash}] onRecordAdded id=${id} record=${util.inspect(record)}`,
    );
  }

  protected onRecordRemoved(id: string): void {
    this.logger.debug(() => `[${this.hash}] onRecordRemoved id=${id}`);
    this.events.emit("ended");
  }
}
