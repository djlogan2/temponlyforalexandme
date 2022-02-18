import Stoppable from "/lib/Stoppable";
import {
  ClockSettings,
  UserChallengeRecord,
} from "/lib/records/ChallengeRecord";
import { Mongo } from "meteor/mongo";
import InstanceService from "/imports/server/service/InstanceService";
import ServerConnection from "/lib/server/ServerConnection";
import CommonReadOnlyChallengeDao from "/imports/dao/CommonReadOnlyChallengeDao";
import WritableChallengeDao from "/imports/server/dao/WritableChallengeDao";
import GameService from "/imports/server/service/GameService";
import { Meteor } from "meteor/meteor";
import ServerChallenge from "/lib/server/ServerChallenge";
import ConnectionService from "/imports/server/service/ConnectionService";
import ServerUser from "/lib/server/ServerUser";

export default class ChallengeService extends Stoppable {
  private instanceservice: InstanceService;

  private readonlydao: CommonReadOnlyChallengeDao;

  private dao: WritableChallengeDao;

  private gameservice: GameService;

  private pUserLogin: (user: ServerUser) => void;

  private pUserLogout: (user: ServerUser) => void;

  protected stopping(): void {}

  constructor(
    parent: Stoppable | null,
    instanceservice: InstanceService,
    readonlydao: CommonReadOnlyChallengeDao,
    dao: WritableChallengeDao,
    gameservice: GameService,
    connectionservice: ConnectionService,
  ) {
    super(parent);
    this.instanceservice = instanceservice;
    this.readonlydao = readonlydao;
    this.dao = dao;
    this.gameservice = gameservice;

    this.pUserLogin = (user) => this.userLogin(user);
    this.pUserLogout = (user) => this.userLogout(user);
  }

  private userLogin(user: ServerUser): void {
    /// update challenges
  }

  private userLogout(user: ServerUser): void {
    /// update and delete challenges
  }

  public addChallenge(
    connection: ServerConnection,
    rated: boolean,
    clock: ClockSettings,
    who?: string[],
  ): void {
    if (!connection.user) throw new Meteor.Error("INVALID_USER");
    const challengerecord: Mongo.OptionalId<UserChallengeRecord> = {
      owner: connection.user.id,
      isolation_group: connection.user.isolation_group,
      instance_id: this.instanceservice.instanceid,
      connection_id: connection._id,
      rated,
      clock,
      who: who || [],
      qualifies: [],
      declined: [],
    };

    let matchingChallenge;
    //
    // We have to keep looking for challenges until we run out of challenges to find
    //
    do {
      matchingChallenge = this.findMatchingChallenge(challengerecord);
      if (matchingChallenge)
        if (this.acceptChallenge(connection, matchingChallenge._id))
          // Another instance could snag it. If it doesn't, we are golden!
          return;
    } while (matchingChallenge);

    this.dao.insert(challengerecord);
  }

  private acceptChallenge(connection: ServerConnection, id: string): boolean {
    if (!connection.user) throw new Meteor.Error("UNABLE_TO_FIND_USER");
    const challenge = this.dao.get(id);
    if (!challenge) return false;
    if (!this.dao.remove(challenge._id)) return false;
    this.gameservice.startGameFromChallenge(
      connection.user,
      challenge,
      connection._id,
    );
    return true;
  }

  private findMatchingChallenge(
    challenge: Mongo.OptionalId<UserChallengeRecord>,
  ): UserChallengeRecord | null {
    const selector: Mongo.Selector<UserChallengeRecord> = {
      $and: [
        { $owner: { $ne: challenge.owner } },
        { isolation_group: challenge.isolation_group },
        { rated: challenge.rated },
        { "clock.minutes": challenge.clock.minutes },
        {
          $or: [
            { who: { $exists: false } },
            { who: { $size: 0 } },
            { who: challenge.owner },
          ],
        },
        { declined: { $ne: challenge.owner } },
      ],
    };

    const challenges = this.dao.readMany(selector);
    if (!challenges || !challenges.length) return null;
    return challenges[0];
  }

  public get(id: string): ServerChallenge {
    const record = this.dao.get(id);
    if (!record) throw new Meteor.Error("UNABLE_TO_FIND_CHALLENGE");

    return new ServerChallenge(
      this,
      record,
      this.readonlydao,
      this.dao,
      this.gameservice,
    );
  }
}
