import React, { Component } from "react";

// @ts-ignore
import ChessBoard from "chessboard";
import "chessboard/dist/index.css";

const Chess = require("chess.js");

interface IDummyChessboardProps {
  flipped?: boolean;
  className?: string;
  fen: string;
  onMoveHandler: (move: string[], promotion: string | undefined) => void;
}

class DummyChessboard extends Component<IDummyChessboardProps> {
  private chess: any;

  constructor(props: IDummyChessboardProps) {
    super(props);

    const { fen } = this.props;

    this.chess = new Chess.Chess();

    this.state = {
      legalMoves: this.getLegalMoves(),
      fen,
      circles: [],
      arrows: [],
      smartMoves: false,
      showLegalMoves: true,
      smallSize: 500,
    };
  }

  getColorFromEvent = (event: any) => "#fafafa";

  getRandomInt = (max: number) => Math.floor(Math.random() * max);

  handleUpdateCircles = (circle: { color: string; event: any; piece: any }) => {
    // @ts-ignore
    const { circles } = this.state;

    circle.color = this.getColorFromEvent(circle.event);
    delete circle.event;

    let equalIndex;
    const isExists = circles.some((element: { piece: any }, index: any) => {
      const isEqual = circle.piece === element.piece;

      if (isEqual) {
        equalIndex = index;
      }

      return isEqual;
    });

    if (isExists) {
      circles.splice(equalIndex, 1);
    } else {
      circles.push(circle);
    }

    this.setState({ circles: [...circles] });
  };

  getLegalMoves = () => {
    const moves = {};
    ["a", "b", "c", "d", "e", "f", "g", "h"].forEach((rank) => {
      // eslint-disable-next-line no-plusplus
      for (let file = 1; file <= 8; file++) {
        const legal = this.chess
          .moves({ square: rank + file, verbose: true })
          .map((verbose: { to: any }) => verbose.to);
        if (!!legal && !!legal.length) {
          // @ts-ignore
          moves[rank + file] = legal;
        }
      }
    });
    return moves;
  };

  handleMove = (move: any[], promotion: any) => {
    const { onMoveHandler, fen } = this.props;
    onMoveHandler(move, promotion);
    this.chess.move(move[0] + move[1] + promotion, { sloppy: true });

    this.setState({ legalMoves: this.getLegalMoves(), fen }, () => {
      const turn = this.chess.turn();

      if (turn === "b") {
        const moves = this.getLegalMoves();
        const movesKeys = Object.keys(moves);
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const move = this.getRandomInt(movesKeys.length);

        setTimeout(() => {
          // @ts-ignore
          this.chess.move(movesKeys[move] + moves[movesKeys[move]][0], {
            sloppy: true,
          });
          this.setState({
            legalMoves: this.getLegalMoves(),
            fen,
          });
        }, 10000);
      }
    });
  };

  handleUpdateArrows = (arrow: {
    color: string;
    event: any;
    piece: { to: any; from: any };
  }) => {
    // @ts-ignore
    const { arrows } = this.state;

    arrow.color = this.getColorFromEvent(arrow.event);
    delete arrow.event;

    let equalIndex;
    const isExists = arrows.some(
      (element: { piece: { to: any; from: any } }, index: any) => {
        const isEqual =
          element.piece.to === arrow.piece.to &&
          element.piece.from === arrow.piece.from;

        if (isEqual) {
          equalIndex = index;
        }

        return isEqual;
      },
    );

    if (isExists) {
      arrows.splice(equalIndex, 1);
    } else {
      arrows.push(arrow);
    }

    this.setState({ arrows: [...arrows] });
  };

  render() {
    const { flipped, className } = this.props;

    const {
      // @ts-ignore
      fen,
      // @ts-ignore
      legalMoves,
      // @ts-ignore
      circles,
      // @ts-ignore
      arrows,
      // @ts-ignore
      smartMoves,
      // @ts-ignore
      showLegalMoves,
      // @ts-ignore
      smallSize,
    } = this.state;

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
          onUpdateCircles={(circle: {
            color: string;
            event: any;
            piece: any;
          }) => this.handleUpdateCircles(circle)}
          onUpdateArrows={(arrow: {
            color: string;
            event: any;
            piece: { to: any; from: any };
          }) => this.handleUpdateArrows(arrow)}
          onMove={(move: any[], promotion: any) =>
            this.handleMove(move, promotion)
          }
          smartMoves={smartMoves}
          showLegalMoves={showLegalMoves}
          smallSize={smallSize}
          isHovering
          promotionPieces={["q", "n", "b", "r"]}
        />
      </div>
    );
  }
}

export default DummyChessboard;
