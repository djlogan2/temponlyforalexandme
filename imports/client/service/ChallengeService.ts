import Stoppable from "/lib/Stoppable";
import ClientChallengeReadOnlyDao from "/imports/client/dao/ClientChallengeReadOnlyDao";
import { Meteor } from "meteor/meteor";
import CommonChallengeService from "/lib/challenges/CommonChallengeService";
import { ClockSettings, PieceColor } from "/lib/records/ChallengeRecord";
import ClientChallengeButtonReadOnlyDao from "../dao/ClientChallengeButtonReadOnlyDao";

export default class ChallengeService extends CommonChallengeService {
  private dao: ClientChallengeReadOnlyDao;

  private buttondao: ClientChallengeButtonReadOnlyDao;

  public get events() {
    return this.dao.events;
  }

  public get buttonEvents() {
    return this.buttondao.events;
  }

  constructor(
    parent: Stoppable | null,
    dao: ClientChallengeReadOnlyDao,
    buttondao: ClientChallengeButtonReadOnlyDao
  ) {
    super(parent, buttondao);
    this.dao = dao;
    this.buttondao = buttondao;
  }

  public onReady() {
    return new Promise((resolve) => {
      const readyHandler = () => {
        resolve(true);
        this.events.off("ready", readyHandler);
      };
      this.events.on("ready", readyHandler);
    });
  }

  public addChallenge(
    clock: ClockSettings,
    rated: boolean,
    color?: PieceColor,
    who?: string[],
    opponentclocks?: ClockSettings
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

  public getButtons() {
    const id = window?.ICCServer?.collections?.users?.findOne()?._id;
    console.log("ID: ", id);
    const buttons = this.buttondao.readMany({ user_id: id });
    console.log("BUTTONS: ", buttons);
    return buttons?.map(button => {
      return { name: button.name, challenge: button.challenge };
    }) || [];
  }

  protected internalAddChallenge(
    _1: string,
    _2: string,
    _3: string,
    clock: ClockSettings,
    rated: boolean,
    color: PieceColor | null,
    who: string[] | null,
    opponentclocks: ClockSettings | null
  ): void {
    Meteor.call("addchallenge", clock, rated, color, who, opponentclocks);
  }

  protected stopping(): void {
  }

  internalAddChallengeButton(): void {
  }

  internalRemoveChallengebutton(): void {
  }

  internalUpdateChallengeButton(): void {
  }
}
