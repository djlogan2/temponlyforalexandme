import Stoppable from "/lib/Stoppable";
import ClientChallengeReadOnlyDao from "/imports/client/dao/ClientChallengeReadOnlyDao";
import { Meteor } from "meteor/meteor";
import CommonChallengeService from "/lib/CommonChallengeService";
import { ClockSettings, PieceColor } from "/lib/records/ChallengeRecord";

export default class ChallengeService extends CommonChallengeService {
  private dao: ClientChallengeReadOnlyDao;

  public get events() {
    return this.dao.events;
  }

  constructor(parent: Stoppable | null, dao: ClientChallengeReadOnlyDao) {
    super(parent);
    this.dao = dao;
  }

  public addChallenge(
    clock: ClockSettings,
    rated: boolean,
    color?: PieceColor,
    who?: string[],
    opponentclocks?: ClockSettings,
  ): void {
    this.createChallenge("", "", "", clock, rated, color, who, opponentclocks);
  }

  public removeChallenge(): void {
    Meteor.call("challenge", "remove", "id");
  }

  public acceptChallenge(): void {
    Meteor.call("accept", "remove", "id");
  }

  public declineChallenge(): void {
    Meteor.call("decline", "remove", "id");
  }

  protected internalAddChallenge(
    _1: string,
    _2: string,
    _3: string,
    clock: ClockSettings,
    rated: boolean,
    color: PieceColor | null,
    who: string[] | null,
    opponentclocks: ClockSettings | null,
  ): void {
    Meteor.call("addchallenge", clock, rated, color, who, opponentclocks);
  }

  protected stopping(): void {}
}
