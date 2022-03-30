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
import * as util from "util";

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
        `[${this.hash}] updateMoveFromEvent move=${util.inspect(
          move,
        )} opponentcolor=${this.me.opponentcolor}`,
    );
    if (move.smith.color !== this.me.opponentcolor)
      this.makeMoveAuth("", move.move);
  }

  protected startTimer(milliseconds: number, fn: () => void) {
    this.logger1.debug(() => `startTimer milliseconds=${milliseconds}`);
    super.startTimer(milliseconds, fn);
    this.events.emit("clockstarted", milliseconds);
  }

  protected stopClock() {
    this.logger1.debug(() => `stopClock`);
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
    this.logger1.debug(
      () =>
        `internalMakeMove move=${util.inspect(move)} opponentcolor=${
          this.me.opponentcolor
        }`,
    );
    if (move.color === this.me.opponentcolor) {
      Meteor.call("gamecommand", this.me._id, { move: move.san, type: "move" });
    }
  }

  protected isAuthorizedToMove(who: User): boolean {
    this.logger1.debug(() => `isAuthorizedToMove who=${who.id}`);
    return who.id === this.me.opponent.userid;
  }

  protected playerColor(who: User): PieceColor | null {
    this.logger1.debug(() => `playerColor who=${who.id}`);
    if (who.id === this.me.opponent.userid) return this.me.opponentcolor;
    return null;
  }

  protected internalSetDraw(
    _who: string,
    color: PieceColor,
    draw: boolean,
  ): void {
    this.logger1.debug(() => `internalSetDraw color=${color} draw=${draw}`);
    Meteor.call("gamecommand", "draw", this.me._id);
  }

  protected isClosing(): void {}
}
