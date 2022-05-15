import React, { FC } from "react";
// @ts-ignore
import ChessBoard from "chessboard";
import "chessboard/dist/index.css";
import {
  accessibilityPieces,
  boardSquares,
  pieceImages,
  promotionPieces,
  raf,
  styles,
} from "./constants";

interface IEnhancedChessboard {
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
  edit?: { add: () => void };
}

const EnhancedChessboard: FC<IEnhancedChessboard> = ({
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
}) => (
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
      edit={edit}
    />
  </div>
);

export default EnhancedChessboard;
