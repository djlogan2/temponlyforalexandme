import { Meteor } from "meteor/meteor";
import CommonBasicGame from "/lib/CommonBasicGame";
import {
  BasicPlayedGameRecord,
  Clock,
  GameStatus,
} from "/lib/records/GameRecord";

export default abstract class CommonPlayedGame extends CommonBasicGame {
  private timerHandle?: number;

  protected abstract endGame(status: GameStatus, status2: number): void;

  // constructor(parent: Stoppable | null, id: string, dao: CommonReadOnlyPlayedGameDao) {
  //   super(parent, id, dao);
  // }

  protected get me(): BasicPlayedGameRecord {
    return super.me as BasicPlayedGameRecord;
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
      clock = this.me.clocks.white;
    } else {
      clock = this.me.clocks.black;
    }

    let startingtime = clock.current;

    if (clock.initial.adjust?.type === "us") {
      this.startTimer(clock.initial.adjust.incseconds, () =>
        this.startTimer(startingtime, () => this.timeExpired()),
      );
      return;
    }

    if (clock.initial.adjust?.type === "inc") {
      startingtime += clock.initial.adjust.incseconds * 1000;
      this.startTimer(startingtime, () => this.timeExpired());
    }
  }

  private startTimer(milliseconds: number, fn: () => void): void {
    this.timerHandle = Meteor.setInterval(() => {
      this.stopTimer();
      fn();
    }, milliseconds);
  }

  private stopTimer(): void {
    if (this.timerHandle) Meteor.clearInterval(this.timerHandle);
  }

  protected stopping(): void {
    this.stopTimer();
  }
}
