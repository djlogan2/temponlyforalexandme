import React, { FC, HTMLAttributes, useEffect, useMemo, useRef } from "react";

import clsx from "clsx";

import { MoveItem } from "client/app/types";
import { Pieces } from "/client/app/constants";
import ScrollBar from "/client/app/shared/ScrollBar";

import "./index.scss";

interface MovesProps extends HTMLAttributes<HTMLDivElement> {
  moves: MoveItem[];
}

const Moves: FC<MovesProps> = ({ moves, className, ...rest }) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({});
  }, [moves]);

  const rows = useMemo(
    () => new Array(Math.ceil(moves.length / 2)).fill(0),
    [moves],
  );

  return (
    <div className={clsx("moves", className)} {...rest}>
      <ScrollBar>
        <ul className="moves__list">
          {rows.map((_, i) => {
            const step = i === 0 ? i : i + 1;
            const WhitePiece = Pieces[moves[step]?.smith?.piece];
            const BlackPiece = Pieces[moves[step + 1]?.smith?.piece];

            return (
              <li key={i} className="moves__item">
                <span>
                  {i + 1}.{WhitePiece && <WhitePiece />}
                  {moves[step].smith.to}
                </span>
                <span>
                  {BlackPiece && <BlackPiece />}
                  {moves[step + 1]?.smith.to}
                </span>
              </li>
            );
          })}
          <li ref={ref} />
        </ul>
      </ScrollBar>
    </div>
  );
};

export default Moves;
