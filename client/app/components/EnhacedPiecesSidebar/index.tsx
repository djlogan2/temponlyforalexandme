import React, { FC } from "react";

// @ts-ignore
import { PiecesSidebar } from "chessboard";

import { pieceImages } from "./constants";
import "chessboard/dist/index.css";

type Props = {
  onAdd?: (pieceName: string) => void;
};

export const EnhancedPiecesSidebar: FC<Props> = ({ onAdd = () => null }) => (
  <div className="root">
    <PiecesSidebar pieceImages={pieceImages} size={50} onAdd={onAdd} />
  </div>
);
