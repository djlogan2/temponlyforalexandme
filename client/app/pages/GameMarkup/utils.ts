import { Chess, Square } from "chess.js";

export const getLegalMoves = (fen: string) => {
  const chess = Chess(fen || "");
  const moves: Record<string, Square[]> = {};
  ["a", "b", "c", "d", "e", "f", "g", "h"].forEach((rank) => {
    for (let file = 1; file <= 8; file++) {
      const legal = chess
        .moves({ square: rank + file, verbose: true })
        .map((verbose) => verbose.to);

      if (legal?.length) {
        moves[rank + file] = legal;
      }
    }
  });
  return moves;
};
