import React, { FC } from "react";
import { options } from "../constants";
import { Components } from "../types";
import { useTranslate } from "/client/app/hooks";
import TabButton from "/client/app/shared/Buttons/TabButton";

type PlayOptionsProps = {
  onClick: (tab: Components) => void;
  gameOption: Components;
};

const PlayOptions: FC<PlayOptionsProps> = ({ onClick, gameOption }) => {
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
