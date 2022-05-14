import * as util from "util";
import { Move } from "chess.js";
import { Meteor } from "meteor/meteor";

import Stoppable from "/lib/Stoppable";
import User from "/lib/User";
import CommonAnalysisGame from "/lib/game/CommonAnalysisGame";
import { AnalysisGameRecord, GameStatus } from "/lib/records/GameRecord";
import CommonSingleGameReadOnlyGameDao from "/imports/dao/CommonSingleGameReadOnlyGameDao";

import ClientLogger from "../ClientLogger";
import ClientUser from "../ClientUser";

export default class ClientAnalysisGame extends CommonAnalysisGame {
  private readonly logger1: ClientLogger;

  private readonly user: ClientUser;

  constructor(
    parent: Stoppable | null,
    gameId: string,
    readonlydao: CommonSingleGameReadOnlyGameDao,
    user: ClientUser,
  ) {
    super(parent, gameId, readonlydao);

    this.user = user;
    this.logger1 = new ClientLogger(this, "ClientAnalysisGame_ts");
  }

  protected internalSetFen(_who: string, fen: string): void {
    this.logger1.debug(() => `internalSetFen fen=${fen}`);

    Meteor.call("gamecommand", this.me._id, { fen, type: "setfen" });
  }

  protected isAuthorizedToMove(whoId: string): boolean {
    this.logger1.debug(() => `isAuthorizedToMove who=${whoId}`);

    if (!this.me.examiners.some((ex) => ex.userid === whoId))
      throw new Meteor.Error("NOT_AN_EXAMINER");

    return true;
  }

  protected premoveTasks(): void {
    throw new Error("Method not implemented.");
  }

  protected postmoveTasks(): void {
    throw new Error("Method not implemented.");
  }

  protected internalMakeMove(
    who: string,
    move: Move,
    _fen: string,
    _result: GameStatus,
  ): void {
    this.logger1.debug(() => `internalMakeMove move=${util.inspect(move)} `);

    if (this.isAuthorizedToMove(who)) {
      Meteor.call("gamecommand", this.me._id, { move: move.san, type: "move" });
    }
  }

  public get events() {
    return this.readonlydao.events;
  }

  protected stopping(): void {}

  protected isClosing(): void {}
}
