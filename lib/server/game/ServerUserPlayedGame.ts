import { Move } from "chess.js";
import {
  GameAuditDrawRecord,
  GameAuditMoveRecord,
  GameStatus,
} from "/lib/records/GameRecord";
import Stoppable from "/lib/Stoppable";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import User from "/lib/User";
import internalMakeMove from "/lib/server/game/CommonInternalMakeMove";
import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";
import { PieceColor } from "/lib/records/ChallengeRecord";
import CommonUserPlayedGame from "/lib/game/CommonUserPlayedGame";
import { Meteor } from "meteor/meteor";
import WritableECODao from "/imports/server/dao/WritableECODao";

export default class ServerUserPlayedGame extends CommonUserPlayedGame {
  private readonly dao: WritableGameDao;

  private readonly ecodao: WritableECODao;

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

  public endGame(status: GameStatus, status2: number): void {
    // TODO: Update ratings and whatnot
    // Maybe we will change this to analyzing someday, but for now, DELETE!
    // this.dao.update(
    //   { _id: this.me._id },
    //   { $set: { status: "analyzing", result: status, result2: status2 } },
    // );
  }

  protected isAuthorizedToMove(who: User): boolean {
    return (
      (this.me.white.userid === who.id && this.me.tomove === "w") ||
      (this.me.black.userid === who.id && this.me.tomove === "b")
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
    modifier.$set.action = { $push: audit };
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
    if (draw !== (type === "drawrequest"))
      throw new Meteor.Error("SERVER_ERROR");
    const audit: GameAuditDrawRecord = {
      type,
      when: new Date(),
      who,
    };
    const modifier: any = { $set: { actions: { $push: audit } } };
    modifier.$set[`pending.${color}.draw`] = draw;
    this.dao.update({ _id: this.me._id }, modifier);
  }

  protected playerColor(who: User): PieceColor | null {
    if (this.me.white.userid === who.id) return "w";
    if (this.me.black.userid === who.id) return "b";
    return null;
  }
}
