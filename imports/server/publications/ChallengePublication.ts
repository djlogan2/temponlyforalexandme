import UserChangePublication from "/imports/server/publications/UserChangePublication";
import { UserChallengeRecord } from "/lib/records/ChallengeRecord";
import ServerUser from "/lib/server/ServerUser";
import { UserRoles } from "/lib/enums/Roles";
import ServerConnection from "/lib/server/ServerConnection";
import Stoppable from "/lib/Stoppable";
import { Mongo } from "meteor/mongo";
import { Subscription } from "meteor/meteor";
import ServerLogger from "/lib/server/ServerLogger";

export default class ChallengePublication extends UserChangePublication<UserChallengeRecord> {
  private user?: ServerUser;

  private readonly logger2: ServerLogger;

  private readonly pRoleAdded: (role: UserRoles) => void;

  private readonly pRoleRemoved: (role: UserRoles) => void;

  constructor(
    parent: Stoppable | null,
    sub: Subscription,
    connection: ServerConnection,
  ) {
    super(parent, sub, "challenges", connection);

    this.logger2 = new ServerLogger(this, "ChallengePublication_ts");

    this.pRoleRemoved = (role) => this.roleremoved(role);
    this.pRoleAdded = (role) => this.roleadded(role);
    if (connection.user) {
      this.userLogin(connection.user);
    }
  }

  protected userLogin(user: ServerUser): void {
    if (this.logger2) this.logger2.debug(() => `userLogin user=${user.id}`);
    this.user = user;
    this.user.events.on("roleremoved", (role) => this.roleremoved(role));
    this.doit();
  }

  protected roleremoved(role: UserRoles): void {
    this.logger2.debug(() => `roleremoved role=${role}`);
    if (role === "play_rated_games" || role === "play_unrated_games")
      this.doit();
  }

  protected roleadded(role: UserRoles): void {
    this.logger2.debug(() => `roleadded role=${role}`);
    this.doit();
  }

  protected doit(): void {
    this.logger2.debug(() => `doit`);
    if (!this.user) return;

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
    this.setSelector(selector);
  }

  protected userLogout(): void {
    this.logger2.debug(() => `userLogout`);
    if (this.user) {
      this.user.events.off("roleadded", this.pRoleAdded);
      this.user.events.off("roleremoved", this.pRoleRemoved);
      delete this.user;
    }
    this.killCursor();
  }
}
