import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useServices } from "/client/app/contexts/services";
import { useAnalysisGame } from "/client/app/hooks";
import EnhancedChessboard from "/client/app/components/EnhancedChessboard";

import AnalysisControlBox from "./components/AnalysisControlBox";
import PieceSelection from "./components/PieceSelection";

const GameAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { gameService } = useServices();
  const { setGameId } = useAnalysisGame(id, gameService);

  useEffect(() => {
    setGameId(id);
  }, []);

  return (
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
};

export default GameAnalysis;
