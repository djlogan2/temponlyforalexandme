import React, { FC } from "react";
import { options } from "../constants";
import { TOptions } from "../types";
import TabButton from "/client/app/shared/Buttons/TabButton";

interface IPlayOptionsProps {
  onClick: (tab: TOptions) => void;
  gameOption: TOptions;
}

const PlayOptions: FC<IPlayOptionsProps> = ({ onClick, gameOption }) => (
  <div className="playOptions d-flex space-between">
    {options.map((tab) => (
      <TabButton
        isColorless={gameOption !== tab}
        key={tab}
        onClick={() => onClick(tab)}
        color={gameOption === tab ? "primary" : undefined}
      >
        {tab}
      </TabButton>
    ))}
  </div>
);

export default PlayOptions;
