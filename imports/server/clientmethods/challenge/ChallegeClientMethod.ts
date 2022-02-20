import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import Stoppable from "/lib/Stoppable";
import { Meteor } from "meteor/meteor";
import ChallengeService from "/imports/server/service/ChallengeService";
import { check } from "meteor/check";
import ServerChallenge from "/lib/server/ServerChallenge";

interface ChallengeObject extends ClientCallObject {
  type: "remove" | "accept" | "decline";
  id: string;
}

export default class ChallengeClientMethod extends AbstractClientMethod {
  private challengeservice: ChallengeService;

  constructor(
    parent: Stoppable | null,
    connectionservice: ConnectionService,
    challengeservice: ChallengeService,
  ) {
    super(parent, "challenge", ["type", "id"], [], connectionservice);
    this.challengeservice = challengeservice;
  }

  protected validatearguments(obj: ChallengeObject): void {
    if (["remove", "accept", "decline"].indexOf(obj.type) === -1)
      throw new Meteor.Error("INVALID_TYPE");
    check(obj.id, String);
  }

  protected called(obj: ChallengeObject): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!obj.connection) {
        reject(new Meteor.Error("UNABLE_TO_FIND_CONNECTION"));
        return;
      }
      if (!obj.user) {
        reject(new Meteor.Error("UNABLE_TO_FIND_USER"));
        return;
      }

      try {
        const challenge: ServerChallenge = this.challengeservice.get(obj.id);
        switch (obj.type) {
          case "remove":
            challenge.remove(obj.user);
            break;
          case "accept":
            challenge.accept(obj.user, obj.connection._id);
            break;
          case "decline":
            challenge.decline(obj.user);
            break;
          default:
            reject(new Meteor.Error("DEFAULT_CASE"));
            return;
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  protected stopping(): void {}
}
