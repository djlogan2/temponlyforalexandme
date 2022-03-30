import { Meteor } from "meteor/meteor";
import User from "../User";
import CommonChallenge from "/lib/challenges/CommonChallenge";

export default class ClientChallenge extends CommonChallenge {
  protected internalAcceptChallenge(who: User, connectionid: string): void {
    Meteor.call("challenge", "accept");
  }

  protected internalDeclineChallenge(who: User): void {
    throw new Error("Method not implemented.");
  }

  protected internalRemoveChallenge(): void {
    throw new Error("Method not implemented.");
  }

  protected stopping(): void {
    throw new Error("Method not implemented.");
  }
}
