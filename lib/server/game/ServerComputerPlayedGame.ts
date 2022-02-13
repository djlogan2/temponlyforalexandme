import { Move } from "chess.js";
import {
  ComputerPlayGameRecord,
  ECOObject,
  GameStatus,
} from "/lib/records/GameRecord";
import CommonComputerPlayedGame from "/lib/game/CommonComputerPlayedGame";
import Stoppable from "/lib/Stoppable";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import User from "/lib/User";
import internalMakeMove from "/lib/server/game/CommonInternalMakeMove";

export default class ServerComputerPlayedGame extends CommonComputerPlayedGame {
  private dao: WritableGameDao;

  constructor(
    parent: Stoppable | null,
    game: ComputerPlayGameRecord,
    readonlydao: CommonReadOnlyGameDao,
    writabledao: WritableGameDao,
  ) {
    super(parent, game, readonlydao);
    this.dao = writabledao;
  }

  protected get me(): ComputerPlayGameRecord {
    return this.game as ComputerPlayGameRecord;
  }

  protected stopping() {
    super.stopping();
  }

  public endGame(status: GameStatus, status2: number): void {
    this.dao.update(
      { _id: this.id },
      { $set: { status: "analyzing", result: status, result2: status2 } },
    );
  }

  protected isAuthorizedToMove(who: User): boolean {
    return user.id === this.me.opponent.userid;
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
