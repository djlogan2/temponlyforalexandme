import {
  AnalysisGameRecord,
  ComputerPlayGameRecord,
} from "/lib/records/GameRecord";
import { Subscription } from "meteor/meteor";
import ServerConnection from "/lib/server/ServerConnection";
import ServerUser from "/lib/server/ServerUser";
import GameService from "/imports/server/service/GameService";
import UserChangePublication from "/imports/server/publications/UserChangePublication";

export default class GamePublication extends UserChangePublication<
  ComputerPlayGameRecord | AnalysisGameRecord
> {
  constructor(
    parent: GameService,
    subscription: Subscription,
    connection: ServerConnection,
    ...args: [any]
  ) {
    super(parent, subscription, "games", connection);
  }

  protected userLogin(user: ServerUser): void {
    this.setSelector({ "opponent.userid": user.id });
  }

  protected userLogout(): void {
    this.killCursor();
  }
}
