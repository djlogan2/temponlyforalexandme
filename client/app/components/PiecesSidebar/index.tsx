import React from "react";

import { Piece } from "chess.js";

import Trash from "../icons/Trash";
import Close from "../icons/Close";

import { pieces } from "./constants";

type Props = {
  onDragStart: (piece: Piece) => void;
};

export const PiecesSidebar: React.FC<Props> = ({ onDragStart }) => {
  const Pieces = pieces.map((piece) => {
    const key = `${piece.color}${piece.type.toUpperCase()}`;

    return {
      color: piece.color,
      element: (
        <img
          key={key}
          alt={key}
          src={piece.image}
          width={50}
          height={50}
          onDragStart={() => onDragStart(piece as Piece)}
          draggable
        />
      ),
    };
  });

  const WhitePieces = Pieces.filter((piece) => piece.color === "w").map(
    (piece) => piece.element,
  );
  const BlackPieces = Pieces.filter((piece) => piece.color === "b").map(
    (piece) => piece.element,
  );

  const TrashButton = (
    <button type="button" onClick={() => console.log("trash")}>
      <Trash />
    </button>
  );

  const CloseButton = (
    <button type="button" onClick={() => console.log("close")}>
      <Close />
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {WhitePieces}
      {CloseButton}
      {TrashButton}
      {BlackPieces}
    </div>
  );
};
