import * as util from "util";
import { Move, Piece, Square } from "chess.js";
import { Meteor } from "meteor/meteor";

import Stoppable from "/lib/Stoppable";
import CommonAnalysisGame from "/lib/game/CommonAnalysisGame";
import { GameStatus } from "/lib/records/GameRecord";
import CommonSingleGameReadOnlyGameDao from "/imports/dao/CommonSingleGameReadOnlyGameDao";

import ClientLogger from "../ClientLogger";
import ClientUser from "../ClientUser";

export default class ClientAnalysisGame extends CommonAnalysisGame {
  private readonly logger1: ClientLogger;

  private readonly user: ClientUser;

  public get events() {
    return this.readonlydao.events;
  }

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
    };
  }

  protected isAuthorizedToMove(whoId: string): boolean {
    this.logger1.debug(() => `isAuthorizedToMove who=${whoId}`);

    if (!this.me.examiners.some((ex) => ex.userid === whoId))
      throw new Meteor.Error("NOT_AN_EXAMINER");

    return true;
  }

  public changePiecePosition(from: Square, to: Square, who: string): void {
    this.logger1.debug(
      () => `changePiecePosition from=${from} to=${to} who=${who}`,
    );

    this.isAuthorizedToMove(who);

    const piece = this.global.chessObject.get(from);

    if (!piece) {
      return;
    }

    this.global.chessObject.remove(from);
    this.global.chessObject.put(piece, to);

    Meteor.call("gamecommand", this.me._id, {
      fen: this.global.chessObject.fen(),
      type: "setfen",
    });
  }

  public put(piece: Piece, square: Square, who: string): void {
    this.logger1.debug(
      () => `internalPut piece=${piece} square=${square} who=${who}`,
    );

    this.isAuthorizedToMove(who);

    this.global.chessObject.put(piece, square);

    Meteor.call("gamecommand", this.me._id, {
      fen: this.global.chessObject.fen(),
      type: "setfen",
    });
  }

  public setFen(fen: string, who: string): void {
    this.internalSetFen(fen, who);
  }

  protected internalSetFen(fen: string, who: string): void {
    this.isAuthorizedToMove(who);

    Meteor.call("gamecommand", this.me._id, {
      fen,
      type: "setfen",
    });
  }

  public remove(square: Square, who: string): void {
    this.logger1.debug(() => `remove square=${square}`);

    this.isAuthorizedToMove(who);

    this.global.chessObject.remove(square);

    Meteor.call("gamecommand", this.me._id, {
      fen: this.global.chessObject.fen(),
      type: "setfen",
    });
  }

  public clear(who: string): void {
    this.logger1.debug(() => "clear");

    this.isAuthorizedToMove(who);

    this.global.chessObject.clear();

    Meteor.call("gamecommand", this.me._id, {
      fen: this.global.chessObject.fen(),
      type: "setfen",
    });
  }

  protected premoveTasks(): void {
    throw new Error("Method not implemented.");
  }

  protected postmoveTasks(): void {
    throw new Error("Method not implemented.");
  }

  protected stopping(): void {}

  protected isClosing(): void {}

  protected internalMakeMove(
    who: string,
    move: Move,
    _fen: string,
    _result: GameStatus,
  ): void {
    throw new Error("Method not implemented.");
  }
}
