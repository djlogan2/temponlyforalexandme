import { Move } from "chess.js";
import {
  AnalysisGameRecord,
  BasicMoveListNode,
  BasicPlayedGameRecord,
  ChessJSFlags,
  ECOObject,
  GameStatus,
  PlayedGameMoveListNode,
} from "/lib/records/GameRecord";

type Modifier = {
  $set: { [key: string]: any };
  $push?: { [key: string]: any };
};

export default function internalMakeMove(
  game: BasicPlayedGameRecord | AnalysisGameRecord,
  move: Move,
  fen: string,
  result: GameStatus,
  result2: number,
  eco: ECOObject,
): Modifier {
  const modifier: Modifier = { $set: {} };

  // Important: updateVariations MUST occur before updateClocks!!
  updateVariations(game, modifier, move, eco);
  updateToMove(game, modifier);
  updateFen(modifier, fen);
  if (game.status !== "analyzing") {
    updateClocks(game, modifier, 0);
    updatePending(game, modifier);
  }
  updateStatus(game, modifier, result, result2);
  return modifier;
}

function updateToMove(
  game: BasicPlayedGameRecord | AnalysisGameRecord,
  modifier: Modifier,
): void {
  modifier.$set.tomove = game.tomove === "w" ? "b" : "w";
}

function updateFen(modifier: Modifier, fen: string): void {
  modifier.$set.fen = fen;
}

function updatePending(game: BasicPlayedGameRecord, modifier: Modifier): void {
  const oppositecolor = game.tomove === "w" ? "b" : "w";
  if (game.pending[oppositecolor].draw) modifier.$set["pending.draw"] = false;
  if (game.pending[oppositecolor].abort) modifier.$set["pending.abort"] = false;
  if (game.pending[oppositecolor].adjourn)
    modifier.$set["pending.adjourn"] = false;
  if (game.pending[oppositecolor].takeback)
    modifier.$set["pending.takeback"] = 0;
}

function updateStatus(
  game: BasicPlayedGameRecord | AnalysisGameRecord,
  modifier: Modifier,
  result: GameStatus,
  result2: number,
): void {
  if (result !== "*") {
    modifier.$set.result = result;
    modifier.$set.result2 = result2;
  }
}

function updateClocks(
  game: BasicPlayedGameRecord,
  modifier: Modifier,
  lag: number,
): void {
  const now = new Date().getTime();
  const stupid = game.clocks[game.tomove].initial.adjust;
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
    now - game.clocks[game.tomove].starttime - lag + inc - delay,
  );

  if (usedtime > 0) modifier.$set[`clocks.${game.tomove}.current`] = usedtime;
}

function updateVariations(
  game: BasicPlayedGameRecord | AnalysisGameRecord,
  modifier: Modifier,
  move: Move,
  eco: ECOObject,
): void {
  const cmi = game.variations.currentmoveindex;
  const currentnode = game.variations.movelist[cmi];
  const { variations } = currentnode;

  const existingmove: number =
    variations?.findIndex((idx) => {
      const existingcmi = variations[idx];
      return (
        (game.variations.movelist[existingcmi] as BasicMoveListNode).move ===
        move.san
      );
    }) || -1;

  if (existingmove !== -1) {
    game.variations.currentmoveindex = existingmove;
    modifier.$set["variations.currentmoveindex"] = existingmove;
  } else {
    const newnode: BasicMoveListNode = {
      prev: cmi,
      smith: {
        color: move.color,
        from: move.from,
        to: move.to,
        flags: move.flags as ChessJSFlags,
        piece: move.piece,
        san: move.san,
      },
      move: move.san,
      eco,
    };

    if (game.status !== "analyzing") {
      (newnode as PlayedGameMoveListNode).wcurrent = game.clocks.w.current;
      (newnode as PlayedGameMoveListNode).bcurrent = game.clocks.b.current;
    }

    game.variations.movelist.push(newnode);
    game.variations.currentmoveindex = game.variations.movelist.length - 1;
    if (!modifier.$push) modifier.$push = {};
    modifier.$push["variations.movelist"] = newnode;
    modifier.$set["variations.currentmoveindex"] =
      game.variations.movelist.length - 1;
  }
}
