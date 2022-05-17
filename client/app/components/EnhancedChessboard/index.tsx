import React, { FC, useCallback, useMemo } from "react";

// @ts-ignore
import ChessBoard from "chessboard";
import { Piece, Square } from "chess.js";

import { convertPieceToValue, convertValueToPiece } from "./utils";
import {
  accessibilityPieces,
  boardSquares,
  pieceImages,
  promotionPieces,
  raf,
  styles,
} from "./constants";
import "chessboard/dist/index.css";

type Props = {
  fen: string;
  flipped: boolean;
  className?: string;
  legalMoves?: string[];
  circles: [];
  arrows: [];
  showLegalMoves: boolean;
  smartMoves: boolean;
  smallSize: number;
  onMoveHandler: Function;
  edit?: { add: Piece };
  handleAdd?: (piece: Piece, square: Square) => void;
  deletePiece?: (square: Square) => void;
};

export const EnhancedChessboard: FC<Props> = ({
  fen,
  flipped,
  className,
  legalMoves,
  circles,
  arrows,
  showLegalMoves,
  smartMoves,
  smallSize,
  onMoveHandler,
  edit,
  handleAdd,
  deletePiece,
}) => {
  const formattedEdit = useMemo(() => {
    if (edit) {
      return {
        piece: convertPieceToValue(edit.add),
      };
    }
  }, [edit]);

  const formattedHandleAdd = useCallback(() => {
    if (handleAdd) {
      return (piece: any, square: any) =>
        handleAdd(convertValueToPiece(piece), square);
    }
  }, [handleAdd]);

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
        onMove={onMoveHandler}
        smartMoves={smartMoves}
        showLegalMoves={showLegalMoves}
        smallSize={smallSize}
        isHovering
        promotionPieces={promotionPieces}
        edit={formattedEdit}
        handleAdd={formattedHandleAdd}
        deletePiece={deletePiece}
      />
    </div>
  );
};
