// @ts-ignore
import { Piece } from "chess.js";

import { Pieces } from "/client/app/constants";

export const convertPieceToValue = (piece: Piece) =>
  `${piece.color}${piece.type.toUpperCase()}`;

export const convertValueToPiece = (value: any): Piece => {
  const color = value[0] as Piece["color"];
  const type = String(value[1]).toLowerCase() as Piece["type"];

  validateValues(color, value);

  const piece: Piece = {
    color,
    type,
  };

  return piece;

  function validateValues(color: any, type: any): void {
    const pieceTypes = Object.keys(Pieces) as Piece["type"][];
    const colors = ["w", "b"] as Piece["color"][];

    if (!pieceTypes.includes(type) && colors.includes(color)) {
      throw new Error(`Can't convert value to Piece: ${value}`);
    }
  }
};