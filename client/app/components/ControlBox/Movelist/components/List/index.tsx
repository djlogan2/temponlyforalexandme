import React, { FC, HTMLAttributes, useEffect, useRef } from "react";
import { IMoveItem } from "/client/app/components/Movelist";
import { Pieces } from "/client/app/constants";
import ScrollBar from "/client/app/shared/ScrollBar";
import Heading6 from "/client/app/shared/Typographies/Heading6";

interface IListProps extends HTMLAttributes<HTMLDivElement> {
  moves: IMoveItem[];
}

const List: FC<IListProps> = ({ moves, ...rest }) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({});
  }, [moves]);

  return (
    <div {...rest}>
      <Heading6>Live chess</Heading6>

      <div className="movelist__moves">
        <ScrollBar>
          <ul className="movelist__list">
            {new Array(Math.ceil(moves.length / 2)).fill(0).map((_, i) => {
              const step = i === 0 ? i : i + 1;
              const WhitePiece = Pieces[moves[step].smith.piece];
              const BlackPiece = Pieces[moves[step + 1].smith.piece];

              return (
                <li key={i} className="movelist__item">
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
            <li ref={ref} />
          </ul>
        </ScrollBar>
      </div>
    </div>
  );
};

export default List;
