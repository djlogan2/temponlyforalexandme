import Stoppable from "/lib/Stoppable";
import User from "/lib/User";
import { UserChallengeRecord } from "/lib/records/ChallengeRecord";
import { Meteor } from "meteor/meteor";
import CommonChallengeService from "/lib/CommonChallengeService";

export default abstract class CommonChallenge extends Stoppable {
  protected record: UserChallengeRecord;

  protected abstract internalAcceptChallenge(
    who: User,
    connectionid: string,
  ): void;

  protected abstract internalDeclineChallenge(who: User): void;

  protected abstract internalRemoveChallenge(): void;

  constructor(parent: Stoppable | null, record: UserChallengeRecord) {
    super(parent);
    this.record = record;
  }

  public accept(who: User, connection: string): void {
    if (!this.record) throw new Meteor.Error("UNABLE_TO_FIND_CHALLENGE");

    if (this.record.isolation_group !== who.isolation_group)
      throw new Meteor.Error("UNABLE_TO_FIND_CHALLENGE");

    if (this.record.owner === who.id)
      throw new Meteor.Error("CANNOT_ACCEPT_OWN_CHALLENGE");

    if (this.record.who && this.record.who.length) {
      if (!this.record.who.some((u) => who.id === u))
        throw new Meteor.Error("CANNOT_ACCEPT_CHALLENGE");
    } else if (!this.record.qualifies.some((u) => who.id === u))
      throw new Meteor.Error("CANNOT_ACCEPT_CHALLENGE");

    const role = this.record.rated ? "play_rated_games" : "play_unrated_games";

    if (!who.isAuthorized([role]))
      throw new Meteor.Error("CANNOT_ACCEPT_CHALLENGE");

    this.internalAcceptChallenge(who, connection);
  }

  public qualifies(who: User): boolean {
    if (this.record.isolation_group !== who.isolation_group) return false;
    if (this.record.owner === who.id) return false;
    if (
      this.record.who &&
      this.record.who.length &&
      !this.record.who.some((u) => u === who.id)
    )
      return false;
    if (!this.record.qualifies.some((u) => u === who.id)) return false;
    if (this.record.rated) {
      if (!who.isAuthorized("play_rated_games")) return false;
    } else if (!who.isAuthorized("play_unrated_games")) return false;
    // noinspection RedundantIfStatementJS
    if (this.record.declined.some((u) => u === who.id)) return false;
    return true;
  }

  public decline(who: User): void {
    if (this.record.owner === who.id)
      throw new Meteor.Error("CANNOT_DECLINE_CHALLENGE");

    if (this.record.declined.some((u) => u === who.id))
      throw new Meteor.Error("ALREADY_DECLINED");

    if (!this.qualifies(who))
      throw new Meteor.Error("CANNOT_DECLINE_CHALLENGE");

    this.internalDeclineChallenge(who);
  }

  public remove(who: User): void {
    if (this.record.owner !== who.id)
      throw new Meteor.Error("CANNOT_REMOVE_CHALLENGE");
    this.internalRemoveChallenge();
  }

  public validateChallenge(challenge: UserChallengeRecord): void {
    CommonChallengeService.valiateChallengeClock(challenge.clock);
    if (challenge.opponentclocks)
      CommonChallengeService.valiateChallengeClock(challenge.opponentclocks);
  }
}
