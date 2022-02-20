import Stoppable from "/lib/Stoppable";
import { ClockSettings, PieceColor } from "/lib/records/ChallengeRecord";
import { Meteor } from "meteor/meteor";

export default abstract class CommonChallengeService extends Stoppable {
  protected abstract internalAddChallenge(
    connection_id: string,
    ownerid: string,
    isolation_group: string,
    clock: ClockSettings,
    rated: boolean,
    color: PieceColor | null,
    who: string[] | null,
    opponentclocks: ClockSettings | null,
  ): void;

  public createChallenge(
    connectionid: string,
    ownerid: string,
    isolationgroup: string,
    clock: ClockSettings,
    rated: boolean,
    color?: PieceColor,
    who?: string[],
    opponentclocks?: ClockSettings,
  ): void {
    CommonChallengeService.valiateChallengeClock(clock);
    if (opponentclocks)
      CommonChallengeService.valiateChallengeClock(opponentclocks);
    this.internalAddChallenge(
      connectionid,
      ownerid,
      isolationgroup,
      clock,
      rated,
      color || null,
      who || null,
      opponentclocks || null,
    );
  }

  public static valiateChallengeClock(clock: ClockSettings): void {
    // It has to be a positive integer or zero
    if (clock.minutes < 0 || !Number.isInteger(clock.minutes))
      throw new Meteor.Error("ILLEGAL_TIME");

    // If it's zero, we have to have a non-zero increment/delay
    if (clock.minutes === 0) {
      if (!clock.adjust?.incseconds) throw new Meteor.Error("ILLEGAL_TIME");
    }

    // If inc/delay exists, it must be a positive integer
    if (clock.adjust) {
      if (
        clock.adjust.incseconds < 1 ||
        !Number.isInteger(clock.adjust.incseconds)
      )
        throw new Meteor.Error("ILLEGAL_TIME");
    }
  }
}
