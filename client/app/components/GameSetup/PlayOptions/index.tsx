import React, { FC } from "react";
import { options } from "../constants";
import { EComponents } from "../types";
import { useTranslate } from "/client/app/hooks";
import TabButton from "/client/app/shared/Buttons/TabButton";

interface IPlayOptionsProps {
  onClick: (tab: EComponents) => void;
  gameOption: EComponents;
}

const PlayOptions: FC<IPlayOptionsProps> = ({ onClick, gameOption }) => {
  const { t } = useTranslate();

  return (
    <div className="playOptions d-flex space-between">
      {options.map((tab) => (
        <TabButton
          isColorless={gameOption !== tab}
          key={tab}
          onClick={() => onClick(tab)}
          color={gameOption === tab ? "primary" : undefined}
        >
          {t(tab)}
        </TabButton>
      ))}
    </div>
  );
};

export default PlayOptions;
