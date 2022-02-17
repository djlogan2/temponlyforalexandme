import CommonChallenge from "/lib/CommonChallenge";
import WritableChallengeDao from "/imports/server/dao/WritableChallengeDao";
import GameService from "/imports/server/service/GameService";
import { UserChallengeRecord } from "/lib/records/ChallengeRecord";
import { Meteor } from "meteor/meteor";
import User from "/lib/User";
import CommonReadOnlyChallengeDao from "/imports/dao/CommonReadOnlyChallengeDao";
import Stoppable from "/lib/Stoppable";

export default class ServerChallenge extends CommonChallenge {
  private dao: WritableChallengeDao;

  private gameservice: GameService;

  constructor(
    parent: Stoppable | null,
    record: UserChallengeRecord,
    readonlydao: CommonReadOnlyChallengeDao,
    dao: WritableChallengeDao,
    gameservice: GameService,
  ) {
    super(parent, record);
    this.dao = dao;
    this.gameservice = gameservice;
  }

  protected internalAcceptChallenge(who: User, connectionid: string): void {
    if (!this.dao.remove(this.record._id))
      throw new Meteor.Error("UNABLE_TO_FIND_CHALLENGE");

    this.gameservice.startGameFromChallenge(who, this.record, connectionid);
  }

  protected internalDeclineChallenge(who: User): void {
    if (
      this.dao.update(
        { _id: this.record._id },
        { $addToSet: { declined: who.id } },
      ) > 0
    )
      this.record.qualifies.push(who.id);
  }

  protected internalRemoveChallenge(): void {
    this.dao.remove(this.record._id);
  }

  protected stopping(): void {}
}
