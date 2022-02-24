import React, { FC } from "react";
import { options } from "../constants";
import { TOptions } from "../types";
import TabButton from "/client/app/shared/Buttons/TabButton";

interface IGameSetupPlayOptionsProps {
  onClick: (tab: TOptions) => void;
  gameOption: TOptions;
}

const GameSetupPlayOptions: FC<IGameSetupPlayOptionsProps> = ({
  onClick,
  gameOption,
}) => (
  <div className="gameSetupPlayOptions d-flex space-between">
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

export default GameSetupPlayOptions;
