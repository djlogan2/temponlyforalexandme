import React from "react";
import EnhancedChessboard from "../../components/EnhancedChessboard";
import AnalysisControlBox from "./components/AnalysisControlBox";
import PieceSelection from "./components/PieceSelection";

const GameAnalysis = () => (
  <div className="gameAnalysis">
    <EnhancedChessboard
      fen="2b2br1/P7/3P1p1p/2p1P2K/k7/NR6/1pP5/q7 w - - 0 1"
      className="gameAnalysis__board"
      flipped={false}
      circles={[]}
      arrows={[]}
      legalMoves={[]}
      showLegalMoves={false}
      smartMoves={false}
      smallSize={500}
      onMoveHandler={() => {}}
    />
    <PieceSelection />
    <AnalysisControlBox className="gameAnalysis__controlBox" />
  </div>
);

export default GameAnalysis;
