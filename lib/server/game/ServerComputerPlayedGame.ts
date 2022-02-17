import { Chess, Move } from "chess.js";
import { ECOObject, GameStatus } from "/lib/records/GameRecord";
import CommonComputerPlayedGame from "/lib/game/CommonComputerPlayedGame";
import Stoppable from "/lib/Stoppable";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import User from "/lib/User";
import internalMakeMove from "/lib/server/game/CommonInternalMakeMove";
import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";
import { PieceColor } from "/lib/records/ChallengeRecord";

export default class ServerComputerPlayedGame extends CommonComputerPlayedGame {
  private dao: WritableGameDao;

  constructor(
    parent: Stoppable | null,
    id: string,
    writabledao: WritableGameDao,
  ) {
    super(parent, id, new ServerReadOnlyGameDao(parent, id, writabledao));
    this.dao = writabledao;
  }

  protected stopping() {
    super.stopping();
  }

  public startClock() {
    super.startClock();
    if (this.me.tomove === this.me.opponentcolor) return;
    // const chess = new Chess(this.me.fen);
    const moves = this.global.chessObject.moves();
    const which = Math.round(Math.random() * (moves.length - 1));
    this.makeMoveAuth(moves[which]);
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
      who.id === this.me.opponent.userid &&
      this.me.tomove === this.me.opponentcolor
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
    return who.id === this.me.opponent.userid ? this.me.opponentcolor : null;
  }
}
