import { Move } from "chess.js";
import { Meteor } from "meteor/meteor";
import { GameStatus } from "/lib/records/GameRecord";
import CommonComputerPlayedGame from "/lib/game/CommonComputerPlayedGame";
import Stoppable from "/lib/Stoppable";
import ClientUser from "/lib/client/ClientUser";
import User from "/lib/User";
import CommonSingleGameReadOnlyGameDao from "/imports/dao/CommonSingleGameReadOnlyGameDao";
import { PieceColor } from "/lib/records/ChallengeRecord";

export class ClientComputerPlayedGame extends CommonComputerPlayedGame {
  private user: ClientUser;

  constructor(
    parent: Stoppable | null,
    id: string,
    readonlydao: CommonSingleGameReadOnlyGameDao,
    user: ClientUser,
  ) {
    super(parent, id, readonlydao);
    this.user = user;
  }

  protected endGame(status: GameStatus, status2: number): void {
    throw new Error("Method not implemented.");
  }

  // fen and result are not currently used on the client, but feel free to use them if you find a reason
  protected internalMakeMove(
    move: Move,
    _fen: string,
    _result: GameStatus,
  ): void {
    Meteor.call("makeMove", this.me._id, move.san);
  }

  protected isAuthorizedToMove(who: User): boolean {
    return who.id === this.me.opponent.userid;
  }

  protected playerColor(who: User): PieceColor | null {
    if (who.id === this.me.opponent.userid) return this.me.opponentcolor;
    return null;
  }
}
