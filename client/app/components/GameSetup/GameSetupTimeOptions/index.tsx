import clsx from "clsx";
import React, { FC } from "react";
import More from "../../icons/More";
import { timeOptions } from "../constants";
import { TTimeOption } from "../types";
import TabButtonSquared from "/client/app/shared/Buttons/TabButtonSquared";

interface IGameSetupTimeOptionsProps {
  showMoreChallengeTimes?: boolean;
  timeOption?: TTimeOption;
  onClick: (time: TTimeOption) => void;
}

const GameSetupTimeOptions: FC<IGameSetupTimeOptionsProps> = ({
  showMoreChallengeTimes,
  timeOption,
  onClick,
}) => (
  <div className="gameSetupTimeOptions">
    <div
      className={clsx(
        "gameSetupTimeOptions__timeOptions",
        showMoreChallengeTimes && "gameSetupTimeOptions__timeOptions--seenAll",
      )}
    >
      {timeOptions.map((time) => (
        <TabButtonSquared
          color={timeOption === time ? "primary" : undefined}
          key={time}
          onClick={() => onClick(time)}
        >
          {time === "custom" && (
            <More className="gameSetupTimeOptions__customTime" />
          )}
          <p>{time}</p>
          {time !== "custom" && <p>minute</p>}
        </TabButtonSquared>
      ))}
    </div>
  </div>
);

export default GameSetupTimeOptions;
