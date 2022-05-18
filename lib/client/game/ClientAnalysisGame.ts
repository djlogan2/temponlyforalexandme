import * as util from "util";
import { Move, Piece, Square } from "chess.js";
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

  public getDefaultProperties() {
    return {
      tomove: this.me.tomove,
      fen: this.me.fen,
      variations: this.me.variations,
      // clocks: this.me.clocks,
      // myColor: this.me.opponentcolor,
    };
  }

  protected isAuthorizedToMove(whoId: string): boolean {
    this.logger1.debug(() => `isAuthorizedToMove who=${whoId}`);

    if (!this.me.examiners.some((ex) => ex.userid === whoId))
      throw new Meteor.Error("NOT_AN_EXAMINER");

    return true;
  }

  protected internalPut(piece: Piece, square: Square, who: string): void {
    this.global.chessObject.put(piece, square);
    const fen = this.global.chessObject.fen();

    this.logger1.debug(
      () => `internalPutPiece piece=${piece} square=${square} who=${who}`,
    );

    if (this.isAuthorizedToMove(who)) {
      Meteor.call("gamecommand", this.me._id, {
        fen,
        type: "setfen",
      });
    }
  }

  public setFen(fen: string, who: string): void {
    this.internalSetFen(fen, who);
  }

  protected internalSetFen(fen: string, who: string): void {
    if (this.isAuthorizedToMove(who)) {
      Meteor.call("gamecommand", this.me._id, {
        fen,
        type: "setfen",
      });
    }
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

  public put(piece: Piece, square: Square, who: string): void {
    this.internalPut(piece, square, who);
  }

  public get events() {
    return this.readonlydao.events;
  }

  protected stopping(): void {}

  protected isClosing(): void {}
}
