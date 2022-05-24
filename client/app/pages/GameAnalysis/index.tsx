import React from "react";

import { useParams } from "react-router-dom";
import { Piece } from "chess.js";

import { useServices } from "/client/app/contexts/services";
import { useAnalysisGame } from "/client/app/hooks";
import { PiecesSidebar } from "/client/app/components/PiecesSidebar";
import { EnhancedChessboard } from "/client/app/components";
import { SQUARES } from "/client/app/constants";

import { AnalysisControlBox } from "./components/AnalysisControlBox";
import ClientAnalysisGame from "/lib/client/game/ClientAnalysisGame";

const GameAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { gameService } = useServices();
  const { fen, makeMove, put, remove, clear } = useAnalysisGame(
    gameService.getTyped(id, connection.user!) as ClientAnalysisGame,
  );

  const [draggedPiece, setDraggedPiece] = React.useState<Piece | null>(null);

  return (
    <div className="gameAnalysis">
      <EnhancedChessboard
        fen={fen}
        className="gameAnalysis__board"
        flipped={false}
        circles={[]}
        arrows={[]}
        legalMoves={() => SQUARES}
        showLegalMoves={false}
        smartMoves={false}
        smallSize={500}
        onMove={makeMove}
        onAdd={put}
        edit={draggedPiece ? { add: draggedPiece } : undefined}
      />
      <PiecesSidebar
        onDragStart={setDraggedPiece}
        onDragEnd={() => setDraggedPiece(null)}
        clear={clear}
      />
      <AnalysisControlBox className="gameAnalysis__controlBox" />
    </div>
  );
};

export default GameAnalysis;
