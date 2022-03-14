import clsx from "clsx";
import React, { FC } from "react";
import { Pieces } from "../../constants";
import { IMoveItem } from "../Movelist";
import "./index.scss";

interface FlatMovelistProps {
  moves: IMoveItem[];
  className?: string;
}

const FlatMovelist: FC<FlatMovelistProps> = ({ moves, className }) => (
  <div className={clsx("flatMovelist__container", className)}>
    <ul className="flatMovelist">
      {new Array(Math.ceil(moves.length / 2)).fill(0).map((_, i) => {
        const step = i === 0 ? i : i + 1;
        const WhitePiece = Pieces[moves[step].smith.piece];
        const BlackPiece = Pieces[moves[step + 1].smith.piece];
        return (
          <li key={i} className="flatMovelist__item">
            <span>
              {i + 1}.{WhitePiece && <WhitePiece />}
              {moves[step].smith.to}
            </span>
            <span>
              {BlackPiece && <BlackPiece />}
              {moves[step + 1].smith.to}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

export default FlatMovelist;
