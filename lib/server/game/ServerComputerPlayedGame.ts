import { Chess, Move } from "chess.js";
import { ECOObject, GameStatus } from "/lib/records/GameRecord";
import CommonComputerPlayedGame from "/lib/game/CommonComputerPlayedGame";
import Stoppable from "/lib/Stoppable";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import User from "/lib/User";
import internalMakeMove from "/lib/server/game/CommonInternalMakeMove";
import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";

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
    const chess = new Chess(this.me.fen);
    const moves = chess.moves();
    const which = Math.round(Math.random() * (moves.length - 1));
    this.makeMoveAuth(moves[which]);
  }

  public endGame(status: GameStatus, status2: number): void {
    this.dao.update(
      { _id: this.me._id },
      { $set: { status: "analyzing", result: status, result2: status2 } },
    );
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
    eco: ECOObject,
  ): void {
    const modifier = internalMakeMove(this.me, move, fen, result, eco);
    this.dao.update({ _id: this.me._id }, modifier);
  }
}
