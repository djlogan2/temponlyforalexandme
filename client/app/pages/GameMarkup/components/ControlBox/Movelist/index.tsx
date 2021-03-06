import { noop } from "lodash";
import React, { FC } from "react";
import GameControls from "../../../../../components/GameControls";
import Moves from "../../../../../components/Moves";
import OpeningName from "./components/OpeningName";
import "./index.scss";
import { useTranslate } from "/client/app/hooks";
import Heading6 from "/client/app/shared/Typographies/Heading6";
import { TMoveItem } from "/client/app/types";

interface IMovelistProps {
  moves: TMoveItem[];
}

const Movelist: FC<IMovelistProps> = ({ moves }) => {
  const { t } = useTranslate();

  return (
    <div className="movelist">
      <GameControls
        className="movelist__controls"
        onNextClick={noop}
        onNextEndClick={noop}
        onPrevClick={noop}
        onPrevEndClick={noop}
      />

      <div className="movelist__list-container">
        <Heading6 className="movelist__heading">{t("liveChess")}</Heading6>
        <Moves moves={moves} className="movelist__moves" />
      </div>

      <OpeningName
        openingName="Chess opening name for these moves"
        className="movelist__openingName"
      />
    </div>
  );
};

export default Movelist;
