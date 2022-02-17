import { Move } from "chess.js";
import { ECOObject, GameStatus } from "/lib/records/GameRecord";
import Stoppable from "/lib/Stoppable";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import User from "/lib/User";
import internalMakeMove from "/lib/server/game/CommonInternalMakeMove";
import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";
import { PieceColor } from "/lib/records/ChallengeRecord";
import CommonUserPlayedGame from "/lib/game/CommonUserPlayedGame";

export default class ServerUserPlayedGame extends CommonUserPlayedGame {
  private dao: WritableGameDao;

  constructor(
    parent: Stoppable | null,
    id: string,
    writabledao: WritableGameDao,
  ) {
    super(parent, id, new ServerReadOnlyGameDao(parent, id, writabledao));
    this.dao = writabledao;
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
    move: Move,
    fen: string,
    result: GameStatus,
    result2: number,
    eco: ECOObject,
  ): void {
    const modifier = internalMakeMove(this.me, move, fen, result, result2, eco);
    this.dao.update({ _id: this.me._id }, modifier);
  }

  protected isClosing(): void {
    this.dao.remove(this.me._id);
  }

  protected internalSetDraw(color: PieceColor, draw: boolean): void {
    const modifier: any = { $set: {} };
    modifier.$set[`pending.${color}.draw`] = draw;
    this.dao.update({ _id: this.me._id }, modifier);
  }

  protected playerColor(who: User): PieceColor | null {
    if (this.me.white.userid === who.id) return "w";
    if (this.me.black.userid === who.id) return "b";
    return null;
  }
}
