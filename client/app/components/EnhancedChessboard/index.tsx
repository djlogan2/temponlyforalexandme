import React, { FC } from "react";
// @ts-ignore
import ChessBoard from "chessboard";
import "chessboard/dist/index.css";

interface IEnhancedChessboard {
  fen: string;
  flipped: boolean;
  className: string;
  legalMoves?: string[];
  circles: [];
  arrows: [];
  showLegalMoves: boolean;
  smartMoves: boolean;
  smallSize: number;
  onMoveHandler: Function;
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
  onMoveHandler
}) => {
  return (
    <div
      id="fake-styles"
      style={{
        width: `${(576 / 1366) * 100}vw`,
        height: `${(576 / 1366) * 100}vw`,
      }}
      className={className}
    >
      <ChessBoard
        raf={{
          inside: true,
          bottom: false,
          right: false,
          left: false,
          top: false,
          relay: true,
        }}
        perspective={flipped ? "black" : "white"}
        fen={fen}
        boardSquares={{
          light: { default: "#A2D1E3", active: "#9c9c9c" },
          dark: { default: "#1D91C0", active: "#1255A1" },
        }}
        pieceImages={{
          bB: "static/images/newPieces/bB.png",
          bK: "static/images/newPieces/bK.png",
          bN: "static/images/newPieces/bN.png",
          bP: "static/images/newPieces/bP.png",
          bQ: "static/images/newPieces/bQ.png",
          bR: "static/images/newPieces/bR.png",
          wB: "static/images/newPieces/wB.png",
          wK: "static/images/newPieces/wK.png",
          wN: "static/images/newPieces/wN.png",
          wP: "static/images/newPieces/wP.png",
          wQ: "static/images/newPieces/wQ.png",
          wR: "static/images/newPieces/wR.png",
        }}
        accessibilityPieces={{
          bP: "Black pawn",
          bR: "Black rook",
          bN: "Black knight",
          bB: "Black bishop",
          bQ: "Black queen",
          bK: "Black king",
          wP: "White pawn",
          wR: "White rook",
          wN: "White knight",
          wB: "White bishop",
          wQ: "White queen",
          wK: "White king",
          emptySquare: "Empty square",
          legalMoves: "Legal moves: ",
        }}
        styles={{
          wrapper: {},
          boardWrapper: {
            backgroundColor: "var(--colorDarkTwo)",
            borderRadius: "15px",
          },
          files: {
            color: "#9698A1",
            secondColor: "#ffffff",
          },
          ranks: {
            color: "#9698A1",
            secondColor: "#ffffff",
          },
          promotion: {
            backgroundColor: "#a8a8a8",
          },
        }}
        movable={legalMoves}
        circles={circles}
        arrows={arrows}
        onUpdateCircles={() => null}
        onUpdateArrows={() => null}
        onMove={(move: any[], promotion?: string) =>
          onMoveHandler(move, promotion)
        }
        smartMoves={smartMoves}
        showLegalMoves={showLegalMoves}
        smallSize={smallSize}
        isHovering
        promotionPieces={["q", "n", "b", "r"]}
      />
    </div>
  );
};

export default EnhancedChessboard;
