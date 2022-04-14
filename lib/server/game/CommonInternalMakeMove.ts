import { Chess, Move } from "chess.js";
import {
  AnalysisGameRecord,
  BasicMoveListNode,
  BasicPlayedGameRecord,
  ChessJSFlags,
  ECOObject,
  GameStatus,
  PlayedGameMoveListNode,
} from "/lib/records/GameRecord";
import WritableECODao from "/imports/server/dao/WritableECODao";

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
  ecodao: WritableECODao,
): Modifier {
  const modifier: Modifier = { $set: {} };

  const preveco = updateECOToDate(game, ecodao, modifier);
  // Important: updateVariations MUST occur before updateClocks!!
  updateVariations(game, modifier, move, ecodao, preveco);
  updateToMove(game, modifier);
  updateFen(modifier, fen);
  if (game.status !== "analyzing") {
    updateClocks(game, modifier, 0);
    updatePending(game, modifier);
  }
  updateStatus(game, modifier, result, result2);
  return modifier;
}

// function getChessEngineWithMoves(game: BasicPlayedGameRecord | AnalysisGameRecord): ChessInstance {
//   const path: number[] = [];
//   let cmi = game.variations.currentmoveindex;
//   while(cmi) {
//     path.push(cmi);
//     cmi = (game.variations.movelist[cmi] as BasicMoveListNode).prev;
//   };
//
//   const inst = new Chess(game.startingFen);
//   while(path.length) {
//     cmi = path.pop() as number;
//     inst.move((game.variations.movelist[cmi] as BasicMoveListNode).move);
//   }
//   return inst;
// }

function updateECOToDate(
  game: BasicPlayedGameRecord | AnalysisGameRecord,
  ecodao: WritableECODao,
  modifier: Modifier,
  pCmi?: number,
): ECOObject {
  let cmi: number = pCmi || game.variations.currentmoveindex;
  let node: BasicMoveListNode = game.variations.movelist[
    cmi
  ] as BasicMoveListNode;
  const path: number[] = [];

  if (node.eco) return node.eco;

  const inst = new Chess(game.startingFen);

  while (cmi) {
    path.push(cmi);
    cmi = (game.variations.movelist[cmi] as BasicMoveListNode).prev;
  }

  let eco: ECOObject = { code: "NO_ECO", name: "NO_ECO" };

  while (path.length) {
    cmi = path.pop() as number;
    node = game.variations.movelist[cmi] as BasicMoveListNode;
    inst.move(node.move);
    if (!node.eco) {
      const record = ecodao.readOne({ fen: inst.fen() });
      if (record) eco = { code: record.eco, name: record.name };
      (game.variations.movelist[cmi] as BasicMoveListNode).eco = eco;
      modifier.$set[`variations.movelist.${cmi}.eco`] = eco;
    }
  }
  return eco;
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

  if (usedtime > 0)
    modifier.$set[`clocks.${game.tomove}.current`] =
      game.clocks[game.tomove].current - usedtime;
}

function updateVariations(
  game: BasicPlayedGameRecord | AnalysisGameRecord,
  modifier: Modifier,
  move: Move,
  ecodao: WritableECODao,
  preveco: ECOObject,
): void {
  const cmi = game.variations.currentmoveindex;
  const currentnode = game.variations.movelist[cmi];
  const { variations } = currentnode;

  const record = ecodao.readOne({ fen: game.fen });
  const eco = record ? { code: record.eco, name: record.name } : preveco;

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
