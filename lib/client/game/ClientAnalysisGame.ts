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
    this.global.chessObject.fen();
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

  protected internalSetFen(fen: string, who: string): void {
    this.isAuthorizedToMove(who);

    Meteor.call("gamecommand", this.me._id, {
      fen,
      type: "setfen",
    });
  }

  public setFen(fen: string, who: string): void {
    this.internalSetFen(fen, who);
  }

  protected internalPut(piece: Piece, square: Square, who: string): void {
    this.logger1.debug(
      () => `internalPut piece=${piece} square=${square} who=${who}`,
    );

    this.isAuthorizedToMove(who);

    this.global.chessObject.remove(square);
    this.global.chessObject.put(piece, square);

    this.internalSetFen(this.global.chessObject.fen(), who);
  }

  public put(piece: Piece, square: Square, who: string): void {
    this.internalPut(piece, square, who);
  }

  public changePiecePosition(from: Square, to: Square, who: string): void {
    this.logger1.debug(
      () => `changePiecePosition from=${from} to=${to} who=${who}`,
    );

    this.isAuthorizedToMove(who);

    this.global.chessObject.load(this.me.fen);

    const piece = this.global.chessObject.get(from);

    if (!piece) {
      return;
    }

    this.internalPut(piece, to, who);
    this.internalSetFen(this.global.chessObject.fen(), who);
  }

  public remove(square: Square, who: string): void {
    this.logger1.debug(() => `remove square=${square}`);

    this.isAuthorizedToMove(who);

    this.global.chessObject.remove(square);

    this.internalSetFen(this.global.chessObject.fen(), who);
  }

  public clear(who: string): void {
    this.logger1.debug(() => "clear");

    this.isAuthorizedToMove(who);

    this.global.chessObject.clear();

    this.internalSetFen(this.global.chessObject.fen(), who);
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
