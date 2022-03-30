import { Meteor } from "meteor/meteor";
import CommonBasicGame from "/lib/game/CommonBasicGame";
import { BasicPlayedGameRecord, Clock } from "/lib/records/GameRecord";
import CommonLogger from "/lib/logger/CommonLogger";
import Stoppable from "/lib/Stoppable";
import CommonSingleGameReadOnlyGameDao from "/imports/dao/CommonSingleGameReadOnlyGameDao";
import User from "/lib/User";
import { PieceColor } from "/lib/records/ChallengeRecord";

export default abstract class CommonPlayedGame extends CommonBasicGame {
  private logger2: CommonLogger;

  protected abstract playerColor(who: User): PieceColor | null;

  protected abstract internalSetDraw(
    who: string,
    color: PieceColor,
    draw: boolean,
    type: "drawdecline" | "drawrevoke" | "drawrequest",
  ): void;

  protected get me(): BasicPlayedGameRecord {
    if (super.me.status === "playing" || super.me.status === "computer")
      return super.me as BasicPlayedGameRecord;
    throw new Meteor.Error("INVALID_TYPE");
  }

  constructor(
    parent: Stoppable | null,
    id: string,
    dao: CommonSingleGameReadOnlyGameDao,
  ) {
    super(parent, id, dao);
    this.logger2 = globalThis.ICCServer.utilities.getLogger(
      this,
      "CommonPlayedGame_ts",
    );
  }

  private timeExpired(): void {
    if (this.me.tomove === "w") {
      this.endGame("0-1", 2);
    } else {
      this.endGame("1-0", 2);
    }
  }

  public startClock(): void {
    let clock: Clock;

    if (this.me.tomove === "w") {
      clock = this.me.clocks.w;
    } else {
      clock = this.me.clocks.b;
    }

    if (clock.initial.adjust?.type === "us") {
      this.startTimer(clock.initial.adjust.incseconds, () =>
        this.startTimer(clock.current, () => this.timeExpired()),
      );
      return;
    }

    this.startTimer(clock.current, () => this.timeExpired());
  }

  protected stopClock(): void {
    this.stopTimer();
  }

  protected startTimer(milliseconds: number, fn: () => void): void {
    this.global.timerHandle = Meteor.setInterval(() => {
      this.stopTimer();
      fn();
    }, milliseconds);
  }

  private stopTimer(): void {
    if (this.global.timerHandle) Meteor.clearInterval(this.global.timerHandle);
  }

  protected stopping(): void {
    super.stopping();
    this.stopTimer();
  }

  protected postmoveTasks(): void {
    this.startClock();
  }

  protected premoveTasks(): void {
    this.stopTimer();
  }

  public resign(who: User): void {
    const color = this.playerColor(who);
    if (!color) throw new Meteor.Error("INSUFFICIENT_AUTHORITY");
    this.resignColor(color);
  }

  public draw(who: User): void {
    // const chess = new Chess(this.me.fen);

    let result2;

    if (this.global.chessObject.insufficient_material()) {
      throw new Meteor.Error(
        "I don't know what to do about this. Can this happen? If you get this crash, figure out how to set result2",
      );
    } else if (this.global.chessObject.in_threefold_repetition()) {
      result2 = 15;
    } else if (this.global.chessObject.in_draw()) {
      // Now can only be "50-move rule"
      result2 = 16;
    }

    if (result2) {
      this.stopTimer();
      this.endGame("1/2-1/2", result2);
      return;
    }

    const color = this.playerColor(who);
    if (!color) throw new Meteor.Error("INSUFFICIENT_AUTHORITY");

    if (this.me.pending[color].draw) return;
    this.internalSetDraw(who.id, color, true, "drawrequest");
  }

  public declineDraw(who: User): void {
    const decliner = this.playerColor(who);
    if (!decliner) throw new Meteor.Error("INSUFFICIENT_AUTHORITY");
    const othercolor = decliner === "w" ? "b" : "w";
    if (!this.me.pending[othercolor].draw) return;
    this.internalSetDraw(who.id, othercolor, false, "drawdecline");
  }

  protected resignColor(color: PieceColor): void {
    const result = color === "w" ? "0-1" : "1-0";
    this.stopTimer();
    this.endGame(result, 0);
  }
}
