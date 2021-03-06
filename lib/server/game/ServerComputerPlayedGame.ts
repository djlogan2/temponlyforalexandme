import { Move } from "chess.js";
import {
  AnalysisGameRecord,
  GameAuditDrawRecord,
  GameAuditMoveRecord,
  GameConvertRecord,
  GameStatus,
} from "/lib/records/GameRecord";
import CommonComputerPlayedGame from "/lib/game/CommonComputerPlayedGame";
import Stoppable from "/lib/Stoppable";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import User from "/lib/User";
import internalMakeMove from "/lib/server/game/CommonInternalMakeMove";
import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";
import { PieceColor } from "/lib/records/ChallengeRecord";
import LambdaChessEngine from "/lib/server/chessengine/LambdaChessEngine";
import ChessEngineService from "/imports/server/service/ChessEngineService";
import { EngineResult } from "/lib/server/EngineInterfaces";
import { Meteor } from "meteor/meteor";
import BookService from "/imports/server/service/BookService";
import WritableECODao from "/imports/server/dao/WritableECODao";
import { Mongo } from "meteor/mongo";

export default class ServerComputerPlayedGame extends CommonComputerPlayedGame {
  private readonly dao: WritableGameDao;

  private readonly engine: LambdaChessEngine;

  private readonly bookservice: BookService;

  private readonly ecodao: WritableECODao;

  constructor(
    parent: Stoppable | null,
    id: string,
    writabledao: WritableGameDao,
    engineservice: ChessEngineService,
    bookservice: BookService,
    ecodao: WritableECODao,
  ) {
    super(parent, id, new ServerReadOnlyGameDao(parent, id, writabledao));
    this.dao = writabledao;
    this.engine = engineservice.acquireComputerPlayUnit();
    this.bookservice = bookservice;
    this.ecodao = ecodao;
  }

  protected stopping() {
    super.stopping();
  }

  public startClock() {
    super.startClock();
    if (this.me.tomove === this.me.opponentcolor) return;
    const bookrecord = this.bookservice.findBook(this.me.fen);
    if (bookrecord) {
      const idx = Math.round(Math.random() * (bookrecord.entries.length - 1));
      this.makeMoveAuth("computer", bookrecord.entries[idx].smith);
      return;
    }
    this.engine
      .getComputerMove(
        this.me.clocks.w.current,
        this.me.clocks.b.current,
        this.me.clocks.w.initial.adjust?.incseconds || 0,
        this.me.clocks.b.initial.adjust?.incseconds || 0,
        this.me.skill_level,
        this.me.fen,
      )
      .then((result: EngineResult) => {
        if (!result.bestmove) {
          this.resignColor(this.me.tomove);
          throw new Meteor.Error("SERVER_ERROR", "NO_BESTMOVE_FOUND");
        }
        this.makeMoveAuth("computer", result.bestmove);
      })
      .catch((err) => {
        this.resignColor(this.me.tomove);
        throw new Meteor.Error(err);
      });
  }

  public endGame(status: GameStatus, status2: number): void {
    // TODO: Update ratings and whatnot
    // Maybe we will change this to analyzing someday, but for now, DELETE!
    const me = {
      userid: this.me.opponent.userid,
      username: this.me.opponent.username || "?",
    };
    const audit: GameConvertRecord = {
      result: status,
      result2: status2,
      type: "convert",
      when: new Date(),
      who: this.me.opponent.userid,
    };
    const modifier: Mongo.Modifier<AnalysisGameRecord> = {
      $set: {
        status: "analyzing",
        result: status,
        result2: status2,
        observers: [me],
        examiners: [me],
      },
      $push: { actions: audit },
    };
    this.dao.update({ _id: this.me._id }, modifier);
  }

  protected isAuthorizedToMove(who: User): boolean {
    return (
      who.id === this.me.opponent.userid &&
      this.me.tomove === this.me.opponentcolor
    );
  }

  protected internalMakeMove(
    who: string,
    move: Move,
    fen: string,
    result: GameStatus,
    result2: number,
  ): void {
    const audit: GameAuditMoveRecord = {
      type: "move",
      move: move.san,
      when: new Date(),
      who,
    };

    const modifier = internalMakeMove(
      this.me,
      move,
      fen,
      result,
      result2,
      this.ecodao,
    );
    // @ts-ignore
    modifier.$push.actions = audit;
    this.dao.update({ _id: this.me._id }, modifier);
  }

  protected isClosing(): void {
    this.dao.remove(this.me._id);
  }

  protected internalSetDraw(
    who: string,
    color: PieceColor,
    draw: boolean,
    type: "drawdecline" | "drawrevoke" | "drawrequest",
  ): void {
    const audit: GameAuditDrawRecord = { type, when: new Date(), who };
    const modifier: any = { $set: { actions: { $push: audit } } };
    modifier.$set[`pending.${color}.draw`] = draw;
    this.dao.update({ _id: this.me._id }, modifier);
  }

  protected playerColor(who: User): PieceColor | null {
    return who.id === this.me.opponent.userid ? this.me.opponentcolor : null;
  }
}
