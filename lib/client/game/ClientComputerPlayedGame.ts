import { Move } from "chess.js";
import { Meteor } from "meteor/meteor";
import { BasicMoveListNode, GameStatus } from "/lib/records/GameRecord";
import CommonComputerPlayedGame from "/lib/game/CommonComputerPlayedGame";
import Stoppable from "/lib/Stoppable";
import ClientUser from "/lib/client/ClientUser";
import User from "/lib/User";
import CommonSingleGameReadOnlyGameDao from "/imports/dao/CommonSingleGameReadOnlyGameDao";
import { PieceColor } from "/lib/records/ChallengeRecord";
import ClientLogger from "/lib/client/ClientLogger";
import { Random } from "meteor/random";

export class ClientComputerPlayedGame extends CommonComputerPlayedGame {
  private readonly user: ClientUser;

  private readonly pMove: (move: BasicMoveListNode) => void;

  private readonly logger1: ClientLogger;

  private readonly hash: string;

  constructor(
    parent: Stoppable | null,
    id: string,
    readonlydao: CommonSingleGameReadOnlyGameDao,
    user: ClientUser,
  ) {
    super(parent, id, readonlydao);
    this.logger1 = new ClientLogger(this, "ClientComputerPlayedGame_ts");
    this.user = user;
    this.hash = Random.hexString(16);

    this.pMove = (move) => this.updateMoveFromEvent(move);
    this.logger1.debug(
      () => `[${this.hash}] constructor is starting 'move' event`,
    );
    this.readonlydao.events.on("move", this.pMove);
  }

  public getDefaultProperties() {
    return {
      tomove: this.me.tomove,
      fen: this.me.fen,
      variations: this.me.variations,
      clocks: this.me.clocks,
    };
  }

  protected updateMoveFromEvent(move: BasicMoveListNode): void {
    this.logger1.debug(
      () =>
        `[${this.hash}] updateMoveFromEvent move=${move.move} color=${move.smith.color} tomove=${this.me.tomove}`,
    );
    if (move.smith.color !== this.me.tomove) this.makeMoveAuth("", move.move);
  }

  protected startTimer(milliseconds: number, fn: () => void) {
    super.startTimer(milliseconds, fn);
    this.events.emit("clockstarted", milliseconds);
  }

  protected stopClock() {
    super.stopClock();
    this.events.emit("clockstopped");
  }

  protected endGame(status: GameStatus, status2: number): void {
    throw new Error("Method not implemented.");
  }

  // fen and result are not currently used on the client, but feel free to use them if you find a reason
  protected internalMakeMove(
    _who: string,
    move: Move,
    _fen: string,
    _result: GameStatus,
  ): void {
    Meteor.call("gamecommand", this.me._id, { move: move.san, type: "move" });
  }

  protected isAuthorizedToMove(who: User): boolean {
    return who.id === this.me.opponent.userid;
  }

  protected playerColor(who: User): PieceColor | null {
    if (who.id === this.me.opponent.userid) return this.me.opponentcolor;
    return null;
  }

  protected internalSetDraw(
    _who: string,
    color: PieceColor,
    draw: boolean,
  ): void {
    Meteor.call("gamecommand", "draw", this.me._id);
  }

  protected isClosing(): void {}
}
