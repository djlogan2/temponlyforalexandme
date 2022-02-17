import { ChessInstance } from "chess.js";

export default interface GlobalGame {
  timerHandle?: number;
  chessObject: ChessInstance;
}
