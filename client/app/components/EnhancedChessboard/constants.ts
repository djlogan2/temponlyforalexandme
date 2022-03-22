export const styles = {
  wrapper: {},
  boardWrapper: {
    backgroundColor: "var(--colorDarkTwo)",
    borderRadius: "15px",
  },
  files: {
    color: "var(--colorGreyOne)",
    secondColor: "var(--colorWhiteOne)",
  },
  ranks: {
    color: "var(--colorGreyOne)",
    secondColor: "var(--colorWhiteOne)",
  },
  promotion: {
    backgroundColor: "var(--colorGreyThree)",
  },
};

export const pieceImages = {
  bB: "var(--bB)",
  bK: "var(--bK)",
  bN: "var(--bN)",
  bP: "var(--bP)",
  bQ: "var(--bQ)",
  bR: "var(--bR)",
  wB: "var(--wB)",
  wK: "var(--wK)",
  wN: "var(--wN)",
  wP: "var(--wP)",
  wQ: "var(--wQ)",
  wR: "var(--wR)",
};

export const accessibilityPieces = {
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
};

export const raf = {
  inside: true,
  bottom: false,
  right: false,
  left: false,
  top: false,
  relay: true,
};

export const boardSquares = {
  light: { default: "#A2D1E3", active: "#9c9c9c" },
  dark: { default: "#1D91C0", active: "#1255A1" },
};

export const promotionPieces = ["q", "n", "b", "r"];
