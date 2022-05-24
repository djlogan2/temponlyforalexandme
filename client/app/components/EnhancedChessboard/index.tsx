import React, { FC, useCallback, useMemo } from "react";

// @ts-ignore
import ChessBoard from "chessboard";
import { Piece, Square } from "chess.js";

import { SQUARES } from "/client/app/constants";

import {
  convertPieceToValue,
  convertValueToPiece,
  convertValueToSquare,
} from "./utils";
import {
  accessibilityPieces,
  boardSquares,
  pieceImages,
  promotionPieces,
  raf,
  styles,
} from "./constants";
import "chessboard/dist/index.css";

type EnhancedChessboardProps = {
  fen: string;
  flipped: boolean;
  circles: [];
  arrows: [];
  showLegalMoves: boolean;
  smartMoves: boolean;
  smallSize: number;
  onMove: (from: Square, to: Square, promotion: any) => void;
  className?: string;
  legalMoves?: string[] | (() => void);
  edit?: { add: Piece };
  onAdd?: (piece: Piece, square: Square) => void;
  onDelete?: (square: Square) => void;
};

export const EnhancedChessboard: FC<EnhancedChessboardProps> = ({
  fen,
  flipped,
  className,
  legalMoves,
  circles,
  arrows,
  showLegalMoves,
  smartMoves,
  smallSize,
  edit,
  onMove,
  onAdd,
  onDelete,
}) => {
  const formattedOnEdit = useMemo(() => {
    if (!edit) return;

    return {
      add: convertPieceToValue(edit.add),
    };
  }, [edit]);

  const formattedOnMove = useCallback(
    (moves: [Square, Square], promotion: any) =>
      onMove(moves[0], moves[1], promotion),
    [onMove],
  );

  const formattedOnAdd = useCallback(
    (piece: any, square: any) => {
      if (!onAdd) return;

      const convertedPiece = convertValueToPiece(piece);
      const convertedSquare = convertValueToSquare(square);

      onAdd(convertedPiece, convertedSquare);
    },

    [onAdd],
  );

  const formattedOnDelete = useCallback(
    (square: any) => {
      if (!onDelete) return;

      onDelete(convertValueToSquare(square));
    },
    [onDelete],
  );

  return (
    <div className={className}>
      <ChessBoard
        bPclassName="p"
        wPclassName=""
        raf={raf}
        perspective={flipped ? "black" : "white"}
        fen={fen}
        boardSquares={boardSquares}
        pieceImages={pieceImages}
        accessibilityPieces={accessibilityPieces}
        styles={styles}
        movable={legalMoves}
        circles={circles}
        arrows={arrows}
        onUpdateCircles={() => null}
        onUpdateArrows={() => null}
        smartMoves={smartMoves}
        showLegalMoves={showLegalMoves}
        smallSize={smallSize}
        isHovering
        promotionPieces={promotionPieces}
        edit={formattedOnEdit}
        onMove={formattedOnMove}
        handleAdd={formattedOnAdd}
        handleDelete={formattedOnDelete}
      />
    </div>
  );
};
