import { Move } from "chess.js";
import { Meteor } from "meteor/meteor";
import { ComputerPlayGameRecord, GameStatus } from "../records/GameRecord";
import CommonComputerPlayedGame from "/lib/CommonComputerPlayedGame";
import Stoppable from "/lib/Stoppable";
import ClientUser from "/lib/client/ClientUser";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";

export class ClientComputerPlayedGame extends CommonComputerPlayedGame {
  private user: ClientUser;

  constructor(
    parent: Stoppable | null,
    game: ComputerPlayGameRecord,
    readonlydao: CommonReadOnlyGameDao,
    user: ClientUser,
  ) {
    super(parent, game, readonlydao);
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
}
