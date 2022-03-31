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
  bB: "var(--resource_bB)",
  bK: "var(--resource_bK)",
  bN: "var(--resource_bN)",
  bP: "var(--resource_bP)",
  bQ: "var(--resource_bQ)",
  bR: "var(--resource_bR)",
  wB: "var(--resource_wB)",
  wK: "var(--resource_wK)",
  wN: "var(--resource_wN)",
  wP: "var(--resource_wP)",
  wQ: "var(--resource_wQ)",
  wR: "var(--resource_wR)",
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
