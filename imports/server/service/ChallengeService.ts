import Stoppable from "/lib/Stoppable";
import {
  ClockSettings,
  PieceColor,
  UserChallengeRecord,
} from "/lib/records/ChallengeRecord";
import { Mongo } from "meteor/mongo";
import InstanceService from "/imports/server/service/InstanceService";
import ServerConnection from "/lib/server/ServerConnection";
import CommonReadOnlyChallengeDao from "/imports/dao/CommonReadOnlyChallengeDao";
import WritableChallengeDao from "/imports/server/dao/WritableChallengeDao";
import GameService from "/imports/server/service/GameService";
import { Meteor, Subscription } from "meteor/meteor";
import ServerChallenge from "/lib/server/ServerChallenge";
import ConnectionService from "/imports/server/service/ConnectionService";
import ServerUser from "/lib/server/ServerUser";
import { UserRoles } from "/lib/enums/Roles";
import ChallengeClientMethod from "/imports/server/clientmethods/challenge/ChallegeClientMethod";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import UserRecord from "/lib/records/UserRecord";
import CommonChallengeService from "/lib/CommonChallengeService";
import CommonReadOnlyButtonChallengeDao from "/imports/dao/CommonReadOnlyButtonChallengeDao";
import ChallengeButtonPublication from "/imports/server/publications/ChallengeButtonPublication";
import ChallengePublication from "/imports/server/publications/ChallengePublication";
import PublicationService from "/imports/server/service/PublicationService";

export default class ChallengeService extends CommonChallengeService {
  private instanceservice: InstanceService;

  private readonly readonlydao: CommonReadOnlyChallengeDao;

  private readonly dao: WritableChallengeDao;

  private readonly gameservice: GameService;

  private readonly userdao: WritableUserDao;

  private readonly challengemethod: ChallengeClientMethod;

  private readonly pUserLogin: (user: ServerUser) => void;

  private readonly pUserLogout: (user: ServerUser) => void;

  private readonly pRoleAdded: (user: ServerUser, role: UserRoles) => void;

  private readonly pRoleRemoved: (user: ServerUser, role: UserRoles) => void;

  private readonly pChallengeAdded: (challenge: UserChallengeRecord) => void;

  protected stopping(): void {}

  constructor(
    parent: Stoppable | null,
    instanceservice: InstanceService,
    readonlydao: CommonReadOnlyChallengeDao,
    dao: WritableChallengeDao,
    gameservice: GameService,
    connectionservice: ConnectionService,
    userdao: WritableUserDao,
    buttondao: CommonReadOnlyButtonChallengeDao,
    publicationservice: PublicationService,
  ) {
    super(parent, buttondao);
    this.instanceservice = instanceservice;
    this.readonlydao = readonlydao;
    this.dao = dao;
    this.gameservice = gameservice;
    this.userdao = userdao;

    this.challengemethod = new ChallengeClientMethod(
      this,
      connectionservice,
      this,
    );

    publicationservice.publishDao(
      "challenges",
      (sub: Subscription, connection: ServerConnection) =>
        new ChallengePublication(this, sub, connection),
    );
    publicationservice.publishDao(
      "challengebuttons",
      (sub: Subscription, connection: ServerConnection) =>
        new ChallengeButtonPublication(this, sub, connection),
    );

    this.pUserLogin = (user) => this.userLogin(user);
    this.pUserLogout = (user) => this.userLogout(user);

    this.pRoleAdded = (user, role: UserRoles) => this.userRoleAdded(user, role);
    this.pRoleRemoved = (user, role: UserRoles) =>
      this.userRoleRemoved(user, role);

    this.pChallengeAdded = (challenge: UserChallengeRecord) =>
      this.challengeAdded(challenge);
    this.dao.events.on("added", (challenge) => this.pChallengeAdded(challenge));
  }

  private challengeAdded(challenge: UserChallengeRecord): void {
    const owner = this.userdao.get(challenge.owner);
    if (!owner) {
      throw new Meteor.Error("UNABLE_TO_FIND_USER");
    }

    const selector: Mongo.Selector<UserRecord> = { online: true };

    if (challenge.who && challenge.who.length) {
      selector._id = { $in: challenge.who };
    } else {
      selector.isolation_group = owner.isolation_group;
      selector.instance_id = this.instanceservice.instanceid;
    }

    const qualified = this.userdao.readMany(selector);
    if (!qualified) return;

    const qualifiedIds = qualified
      .filter(
        (q) =>
          (challenge.rated && q.roles.some((r) => r === "play_rated_games")) ||
          (challenge.rated && q.roles.some((r) => r === "play_unrated_games")),
      )
      .map((q) => q._id);

    this.dao.update({ _id: challenge._id }, { $addToSet: qualifiedIds });
  }

  private userLogin(user: ServerUser): void {
    user.events.on("roleadded", (role: UserRoles) =>
      this.pRoleAdded(user, role),
    );
    user.events.on("roleremoved", (role: UserRoles) =>
      this.pRoleRemoved(user, role),
    );
    this.addToExistingChallenges(user);
  }

  private userLogout(user: ServerUser): void {
    user.events.off("roleadded", this.pRoleAdded);
    user.events.off("roleremoved", this.pRoleRemoved);
    this.dao.update({ qualifies: user.id }, { $pull: { qualifies: user.id } });
    this.dao.removeMany({ owner: user.id });
  }

  private userRoleRemoved(user: ServerUser, role: UserRoles): void {
    if (role !== "play_rated_games" && role !== "play_unrated_games") return;
    this.dao.update(
      {
        qualifies: user.id,
        rated: role !== "play_rated_games",
      },
      { $pull: { qualifies: user.id } },
    );
  }

  private userRoleAdded(user: ServerUser, role: UserRoles): void {
    if (role !== "play_rated_games" && role !== "play_unrated_games") return;
    this.addToExistingChallenges(user);
  }

  private addToExistingChallenges(user: ServerUser): void {
    if (
      !user.isAuthorized("play_rated_games") &&
      !user.isAuthorized("play_unrated_games")
    )
      return;

    let rated = null;

    if (!user.isAuthorized("play_rated_games")) rated = false;
    else if (!user.isAuthorized("play_unrated_games")) rated = true;

    const selector: Mongo.Selector<UserChallengeRecord> = {
      $and: [
        { isolation_group: user.isolation_group },
        { declined: { $ne: user.id } },
        { qualifies: { $ne: user.id } },
        {
          $or: [
            { who: { $exists: false } },
            { who: { $size: 0 } },
            { who: user.id },
          ],
        },
      ],
    };

    if (rated !== null) {
      // @ts-ignore
      selector.$and.push({ rated });
    }

    const ids = this.dao.readMany(selector)?.map((c) => c._id);
    if (ids && ids.length)
      this.dao.update(
        { _id: { $in: ids } },
        { $addToSet: { qualifies: user.id } },
      );
  }

  public addChallenge(
    connection: ServerConnection,
    rated: boolean,
    clock: ClockSettings,
    color?: PieceColor,
    who?: string[],
    opponentclock?: ClockSettings,
  ): void {
    if (!connection.user) throw new Meteor.Error("INVALID_USER");

    if (who && who.length) {
      if (who.indexOf(connection.user.id) !== -1)
        throw new Meteor.Error("INVALID_USERID");
      if (
        this.userdao.count({
          isolation_group: connection.user.isolation_group,
          _id: { $in: who },
        }) !== who.length
      )
        throw new Meteor.Error("INVALID_USERID");
    }

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

    if (color) challengerecord.color = color;

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

    // TODO: What do we wnat to do if one user picks a color and another does not?
    //   Right now, a challenge will only match if neither does or both do, and if
    //   both do, they have to pick opposite colors.
    if (challenge.color) {
      // @ts-ignore
      selector.$and.push({ color: challenge.color === "w" ? "b" : "w" });
    }

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

  protected internalAddChallenge(
    connectionId: string,
    ownerid: string,
    isolationGroup: string,
    clock: ClockSettings,
    rated: boolean,
    color: PieceColor | null,
    who: string[] | null,
    opponentclocks: ClockSettings | null,
  ): void {
    const userchallenge: Mongo.OptionalId<UserChallengeRecord> = {
      clock,
      connection_id: connectionId,
      declined: [],
      instance_id: this.instanceservice.instanceid,
      isolation_group: isolationGroup,
      owner: ownerid,
      qualifies: [],
      rated,
      who: who || [],
    };
    if (color) userchallenge.color = color;
    if (opponentclocks) userchallenge.opponentclocks = opponentclocks;
    this.dao.insert(userchallenge);
  }

  public internalAddChallengeButton(): void {
    throw new Error("Method not implemented.");
  }

  public internalUpdateChallengeButton(): void {
    throw new Error("Method not implemented.");
  }

  public internalRemoveChallengebutton(): void {
    throw new Error("Method not implemented.");
  }
}
