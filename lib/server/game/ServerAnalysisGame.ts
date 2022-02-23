import { Move } from "chess.js";
import CommonAnalysisGame from "/lib/game/CommonAnalysisGame";
import {
  GameStatus,
  ECOObject,
  GameAuditMoveRecord,
  GameAuditSetFenRecord,
} from "/lib/records/GameRecord";
import User from "/lib/User";
import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import Stoppable from "/lib/Stoppable";
import internalMakeMove from "./CommonInternalMakeMove";
import { PieceColor } from "/lib/records/ChallengeRecord";

export default class ServerAnalysisGame extends CommonAnalysisGame {
  private dao: WritableGameDao;

  constructor(
    parent: Stoppable | null,
    id: string,
    writabledao: WritableGameDao,
  ) {
    super(parent, id, new ServerReadOnlyGameDao(parent, id, writabledao));
    this.dao = writabledao;
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
    eco: ECOObject,
  ): void {
    const audit: GameAuditMoveRecord = {
      type: "move",
      move: move.san,
      when: new Date(),
      who,
    };

    const modifier = internalMakeMove(this.me, move, fen, result, result2, eco);
    modifier.$set.action = { $push: audit };
    this.dao.update({ _id: this.me._id }, modifier);
  }

  protected internalSetFen(who: string, fen: string): void {
    const tomove = fen.split(/\s+/)[1] as PieceColor;

    const audit: GameAuditSetFenRecord = {
      type: "setfen",
      when: new Date(),
      who,
      fen,
    };

    this.dao.update({ _id: this.me._id }, { $set: { tomove, fen } });
  }

  protected stopping(): void {}

  protected isClosing(): void {}
}
