import UserChangePublication from "/imports/server/publications/UserChangePublication";
import { UserChallengeRecord } from "/lib/records/ChallengeRecord";
import ServerUser from "/lib/server/ServerUser";
import { UserRoles } from "/lib/enums/Roles";
import ServerConnection from "/lib/server/ServerConnection";
import Stoppable from "/lib/Stoppable";
import { Mongo } from "meteor/mongo";
import { Subscription } from "meteor/meteor";

export default class ChallengePublication extends UserChangePublication<UserChallengeRecord> {
  private user?: ServerUser;

  private readonly pRoleAdded: (role: UserRoles) => void;

  private readonly pRoleRemoved: (role: UserRoles) => void;

  constructor(
    parent: Stoppable | null,
    sub: Subscription,
    connection: ServerConnection,
  ) {
    super(parent, sub, "challenges", connection);

    this.pRoleRemoved = (role) => this.roleremoved(role);
    this.pRoleAdded = (role) => this.roleadded(role);
    if (connection.user) {
      this.userLogin(connection.user);
    }
  }

  protected userLogin(user: ServerUser): void {
    this.user = user;
    this.user.events.on("roleremoved", (role) => this.roleremoved(role));
  }

  protected roleremoved(role: UserRoles): void {
    if (role === "play_rated_games" || role === "play_unrated_games")
      this.doit();
  }

  protected roleadded(role: UserRoles): void {}

  protected doit(): void {
    if (!this.user) return;

    if (!this.user.isAuthorized(["play_rated_games", "play_unrated_games"])) {
      this.killCursor();
      return;
    }

    let checkrated = null;
    if (!this.user.isAuthorized("play_rated_games")) checkrated = false;
    else if (!this.user.isAuthorized("play_unrated_games")) checkrated = true;

    const selector: Mongo.Selector<UserChallengeRecord> = {
      $and: [
        { isolation_group: this.user.isolation_group }, // Must be in isolation group
        {
          $or: [
            { owner: this.user.id },
            {
              $and: [
                { qualifies: this.user.id },
                { declined: { $ne: this.user.id } },
              ],
            },
          ],
        },
      ],
    };

    if (checkrated !== null) {
      // @ts-ignore
      selector.$and[1].$or[1].push({ rated: checkrated });
    }
    this.setSelector(selector);
  }

  protected userLogout(): void {
    if (this.user) {
      this.user.events.off("roleadded", this.pRoleAdded);
      this.user.events.off("roleremoved", this.pRoleRemoved);
      delete this.user;
    }
    this.killCursor();
  }
}
