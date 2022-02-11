import { Move } from "chess.js";
import {
  ChessJSFlags,
  ComputerPlayGameRecord,
  GameStatus,
  PlayedGameMoveListNode,
} from "../records/GameRecord";
import CommonComputerPlayedGame from "/lib/CommonComputerPlayedGame";
import Stoppable from "/lib/Stoppable";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import WritableGameDao from "/imports/server/dao/WritableGameDao";

type Modifier = {
  $set: { [key: string]: any };
  $push?: { [key: string]: any };
};

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

  protected internalMakeMove(
    move: Move,
    fen: string,
    result: GameStatus,
  ): void {
    const modifier: Modifier = { $set: {} };

    // Important: updateVariations MUST occur before updateClocks!!
    this.updateVariations(modifier, move);
    this.updateToMove(modifier);
    ServerComputerPlayedGame.updateFen(modifier, fen);
    this.updateClocks(modifier, 0);
    this.updatePending(modifier);
    ServerComputerPlayedGame.updateStatus(modifier, result);
    this.dao.update({ _id: this.me._id }, modifier);
  }

  private updateToMove(modifier: Modifier): void {
    modifier.$set.tomove = this.me.tomove === "w" ? "b" : "w";
  }

  private static updateFen(modifier: Modifier, fen: string): void {
    modifier.$set.fen = fen;
  }

  private updatePending(modifier: Modifier): void {
    const oppositecolor = this.me.tomove === "w" ? "b" : "w";
    if (this.me.pending[oppositecolor].draw)
      modifier.$set["pending.draw"] = false;
    if (this.me.pending[oppositecolor].abort)
      modifier.$set["pending.abort"] = false;
    if (this.me.pending[oppositecolor].adjourn)
      modifier.$set["pending.adjourn"] = false;
    if (this.me.pending[oppositecolor].takeback)
      modifier.$set["pending.takeback"] = 0;
  }

  private static updateStatus(modifier: Modifier, result: GameStatus): void {
    switch (result) {
      case "1-0":
        modifier.$set.result = result;
        modifier.$set.result2 = 0;
        break;
      case "0-1":
        modifier.$set.result = result;
        modifier.$set.result2 = 0;
        break;
      case "1/2-1/2":
        modifier.$set.result = result;
        modifier.$set.result2 = 0;
        break;
      case "*":
      default:
        break;
    }
  }

  private updateClocks(modifier: Modifier, lag: number): void {
    const now = new Date().getTime();
    const stupid = this.me.clocks[this.me.tomove].initial.adjust;
    let inc = 0;
    let delay = 0;
    if (stupid) {
      switch (stupid.type) {
        case "inc":
          inc = stupid.incseconds;
          break;
        // case "us":
        // This occurs in the timer, and is not relevant here.
        case "bronstein":
          delay = stupid.incseconds;
          break;
        default:
      }
    }
    const usedtime = Math.round(
      now - this.me.clocks[this.me.tomove].starttime - lag + inc - delay,
    );

    if (usedtime > 0)
      modifier.$set[`clocks.${this.me.tomove}.current`] = usedtime;
  }

  private updateVariations(modifier: Modifier, move: Move): void {
    const cmi = this.me.variations.currentmoveindex;
    const currentnode = this.me.variations.movelist[cmi];
    const { variations } = currentnode;

    const existingmove: number =
      variations?.findIndex((idx) => {
        const existingcmi = variations[idx];
        return this.me.variations.movelist[existingcmi].move === move.san;
      }) || -1;

    if (existingmove !== -1) {
      this.me.variations.currentmoveindex = existingmove;
      modifier.$set["variations.currentmoveindex"] = existingmove;
    } else {
      const newnode: PlayedGameMoveListNode = {
        prev: cmi,
        smith: {
          color: move.color,
          from: move.from,
          to: move.to,
          flags: move.flags as ChessJSFlags,
          piece: move.piece,
          san: move.san,
        },
        wcurrent: this.me.clocks.w.current,
        bcurrent: this.me.clocks.b.current,
        move: move.san,
        eco: {
          name: "x",
          code: "x",
        },
      };
      this.me.variations.movelist.push(newnode);
      this.me.variations.currentmoveindex =
        this.me.variations.movelist.length - 1;
      if (!modifier.$push) modifier.$push = {};
      modifier.$push["variations.movelist"] = newnode;
      modifier.$set["variations.currentmoveindex"] =
        this.me.variations.movelist.length - 1;
      this.me.tomove = this.me.tomove === "w" ? "b" : "w";
    }
  }
}
