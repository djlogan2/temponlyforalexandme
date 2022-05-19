import React, { FC } from "react";
import { Pawn } from "../icons/ChessFigures/Pawn";
import { Knight } from "../icons/ChessFigures/Knight";
import { Bishop } from "../icons/ChessFigures/Bishop";
import { Rook } from "../icons/ChessFigures/Rook";
import { Queen } from "../icons/ChessFigures/Queen";
import { King } from "../icons/ChessFigures/King";

export type TFigures = "p" | "n" | "b" | "r" | "q" | "k";

type TColors = "white" | "black";

export interface ICapturedPiecesProps {
  color?: TColors;
  soliders: { [K in TFigures]?: number };
}

export const ComponentsMap = {
  p: Pawn,
  n: Knight,
  b: Bishop,
  r: Rook,
  q: Queen,
  k: King,
};

export const CapturedPieces: FC<ICapturedPiecesProps> = ({
  color = "white",
  soliders,
}) => {
  const solidersKeys = Object.keys(soliders) as Array<TFigures>;

  return (
    <div>
      {solidersKeys.map((key) =>
        soliders[key] ? (
          <div key={key}>
            {new Array(soliders[key]).map((_, idx) => {
              const Component = ComponentsMap[key];

              // eslint-disable-next-line react/no-array-index-key
              return <Component color={color} key={idx} />;
            })}
          </div>
        ) : null,
      )}
    </div>
  );
};
