import { Piece } from "chess.js";

export const pieces: Array<Piece & { image: string }> = [
  { type: "b", color: "w", image: "static/images/newPieces/wB.svg" },
  { type: "k", color: "w", image: "static/images/newPieces/wK.svg" },
  { type: "n", color: "w", image: "static/images/newPieces/wN.svg" },
  { type: "p", color: "w", image: "static/images/newPieces/wP.svg" },
  { type: "q", color: "w", image: "static/images/newPieces/wQ.svg" },
  { type: "r", color: "w", image: "static/images/newPieces/wR.svg" },
  { type: "b", color: "b", image: "static/images/newPieces/bB.svg" },
  { type: "k", color: "b", image: "static/images/newPieces/bK.svg" },
  { type: "n", color: "b", image: "static/images/newPieces/bN.svg" },
  { type: "p", color: "b", image: "static/images/newPieces/bP.svg" },
  { type: "q", color: "b", image: "static/images/newPieces/bQ.svg" },
  { type: "r", color: "b", image: "static/images/newPieces/bR.svg" },
];
