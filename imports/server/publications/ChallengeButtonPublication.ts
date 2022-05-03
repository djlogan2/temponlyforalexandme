import { ChallengeButtonRecord } from "/lib/records/ChallengeButtonRecord";
import UserChangePublication from "/imports/server/publications/UserChangePublication";
import ServerUser from "/lib/server/ServerUser";
import ServerConnection from "/lib/server/ServerConnection";
import Stoppable from "/lib/Stoppable";
import { Subscription } from "meteor/meteor";

export default class ChallengeButtonPublication extends UserChangePublication<ChallengeButtonRecord> {
  constructor(
    parent: Stoppable | null,
    pub: Subscription,
    connection: ServerConnection,
  ) {
    super(parent, pub, "challengebuttons", connection);
  }

  protected userLogin(user: ServerUser): void {
    this.getButtons(user);
  }

  protected userLogout(): void {
    this.getButtons();
  }

  private getButtons(user?: ServerUser): void {
    this.setSelector({
      $or: [
        {
          user_id: user?.id,
        },
        {
          $and: [
            {
              user_id: {
                $exists: false,
              },
            },
            {
              $or: [
                {
                  isolation_group: user?.isolation_group,
                },
                {
                  isolation_group: {
                    $exists: false,
                  },
                },
              ],
            },
          ],
        },
      ],
    });
  }
}
