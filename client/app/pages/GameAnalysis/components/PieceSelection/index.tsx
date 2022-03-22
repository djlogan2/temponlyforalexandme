import React from "react";
import "./index.scss";
import Rook from "../../../../components/icons/ChessFigures/Rook";
import Knight from "/client/app/components/icons/ChessFigures/Knight";
import Pawn from "/client/app/components/icons/ChessFigures/Pawn";
import Bishop from "/client/app/components/icons/ChessFigures/Bishop";
import Queen from "/client/app/components/icons/ChessFigures/Queen";
import King from "/client/app/components/icons/ChessFigures/King";
import ActionButton from "/client/app/shared/Buttons/ActionButton";
import Close from "/client/app/components/icons/Close";
import Trash from "/client/app/components/icons/Trash";

const PieceSelection = () => (
  <div className="pieceSelection">
    <King className="p pieceSelection--black pointer" />
    <Queen className="pieceSelection--black pointer" />
    <Bishop className="pieceSelection--black pointer" />
    <Knight className="pieceSelection--black pointer" />
    <Rook className="pieceSelection--black pointer" />
    <Pawn className="pieceSelection--black pointer" />
    <ActionButton
      color="secondary"
      size="small"
      className="pieceSelection--close"
    >
      <Close />
    </ActionButton>
    <ActionButton color="danger" size="small" className="pieceSelection--trash">
      <Trash />
    </ActionButton>

    <Pawn className="pieceSelection--white pointer" />
    <Rook className="pieceSelection--white pointer" />
    <Knight className="pieceSelection--white pointer" />
    <Bishop className="pieceSelection--white pointer" />
    <Queen className="pieceSelection--white pointer" />
    <King className="pieceSelection--white pointer" />
  </div>
);

export default PieceSelection;
