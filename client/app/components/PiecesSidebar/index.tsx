import React from "react";

import { Piece } from "chess.js";

import { Trash } from "../icons/Trash";
import { Close } from "../icons/Close";

import { pieces } from "./constants";

type PiecesSidebarProps = {
  clear: () => void;
  onDragStart?: (piece: Piece) => void;
  onDragEnd?: () => void;
};

export const PiecesSidebar: React.FC<PiecesSidebarProps> = ({
  clear,
  onDragStart,
  onDragEnd,
}) => {
  const Pieces = pieces.map((imgPiece) => {
    const key = `${imgPiece.color}${imgPiece.type.toUpperCase()}`;

    return {
      color: imgPiece.color,
      element: (
        <img
          key={key}
          alt={key}
          src={imgPiece.image}
          width={50}
          height={50}
          onDragStart={() => onDragStart && onDragStart(imgPiece as Piece)}
          onDragEnd={onDragEnd}
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
    <button type="button" onClick={clear}>
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
