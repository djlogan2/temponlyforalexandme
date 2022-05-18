import { Move, Piece, Square } from "chess.js";
import CommonAnalysisGame from "/lib/game/CommonAnalysisGame";
import {
  GameStatus,
  GameAuditMoveRecord,
  GameAuditSetFenRecord,
} from "/lib/records/GameRecord";
import User from "/lib/User";
import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import Stoppable from "/lib/Stoppable";
import internalMakeMove from "./CommonInternalMakeMove";
import WritableECODao from "/imports/server/dao/WritableECODao";

export default class ServerAnalysisGame extends CommonAnalysisGame {
  private dao: WritableGameDao;

  private ecodao: WritableECODao;

  constructor(
    parent: Stoppable | null,
    id: string,
    writabledao: WritableGameDao,
    ecodao: WritableECODao,
  ) {
    super(parent, id, new ServerReadOnlyGameDao(parent, id, writabledao));
    this.dao = writabledao;
    this.ecodao = ecodao;
  }

  protected isAuthorizedToMove(who: User): boolean {
    throw new Error("Method not implemented.");
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
    modifier.$set.action = { $push: audit };
    this.dao.update({ _id: this.me._id }, modifier);
  }

  protected internalSetFen(fen: string, who: string): void {
    const audit: GameAuditSetFenRecord = {
      type: "setfen",
      when: new Date(),
      who,
      fen,
    };

    this.dao.update(
      { _id: this.me._id },
      { $set: { fen }, $push: { actions: audit } },
    );
  }

  protected stopping(): void {}

  protected isClosing(): void {}
}
