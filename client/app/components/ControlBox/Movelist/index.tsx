import { noop } from "lodash";
import React, { FC } from "react";
import { IMoveItem } from "../../Movelist";
import Controls from "./components/Controls";
import List from "./components/List";
import OpeningName from "./components/OpeningName";
import "./index.scss";

interface IMovelistProps {
  moves: IMoveItem[];
}

const Movelist: FC<IMovelistProps> = ({ moves }) => (
  <div className="movelist">
    <Controls
      className="movelist__controls"
      onNextClick={noop}
      onNextEndClick={noop}
      onPrevClick={noop}
      onPrevEndClick={noop}
    />
    <List className="movelist__list-container" moves={moves} />

    <OpeningName
      openingName="Chess opening name for these moves"
      className="movelist__openingName"
    />
  </div>
);

export default Movelist;
