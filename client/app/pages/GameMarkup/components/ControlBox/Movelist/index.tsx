import { noop } from "lodash";
import React, { FC } from "react";
import GameControls from "../../../../../components/GameControls";
import { IMoveItem } from "../../../../../components/Movelist";
import Moves from "../../../../../components/Moves";
import OpeningName from "./components/OpeningName";
import "./index.scss";
import Heading6 from "/client/app/shared/Typographies/Heading6";

interface IMovelistProps {
  moves: IMoveItem[];
}

const Movelist: FC<IMovelistProps> = ({ moves }) => (
  <div className="movelist">
    <GameControls
      className="movelist__controls"
      onNextClick={noop}
      onNextEndClick={noop}
      onPrevClick={noop}
      onPrevEndClick={noop}
    />

    <div className="movelist__list-container">
      <Heading6 className="movelist__heading">Live Chess</Heading6>
      <Moves moves={moves} className="movelist__moves" />
    </div>

    <OpeningName
      openingName="Chess opening name for these moves"
      className="movelist__openingName"
    />
  </div>
);

export default Movelist;
