import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { Piece } from "chess.js";

import { useServices } from "/client/app/contexts/services";
import { useAnalysisGame } from "/client/app/hooks";
import { PiecesSidebar } from "/client/app/components/PiecesSidebar";
import { EnhancedChessboard } from "/client/app/components";

import AnalysisControlBox from "./components/AnalysisControlBox";

const GameAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { gameService } = useServices();
  const { setGameId, makeMove, put } = useAnalysisGame(id, gameService);

  const [draggedPiece, setDraggedPiece] = React.useState<Piece | null>(null);

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
        handleAdd={put()}
        edit={draggedPiece ? { add: draggedPiece } : undefined}
      />
      <PiecesSidebar onDragStart={setDraggedPiece} />
      <AnalysisControlBox className="gameAnalysis__controlBox" />
    </div>
  );
};

export default GameAnalysis;
