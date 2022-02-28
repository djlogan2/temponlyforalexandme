import clsx from "clsx";
import React, { FC } from "react";
import More from "../../icons/More";
import { timeOptions } from "../constants";
import { TTimeOption } from "../types";
import TabButtonSquared from "/client/app/shared/Buttons/TabButtonSquared";

interface ITimeOptionProps {
  showMoreChallengeTimes?: boolean;
  timeOption?: TTimeOption;
  onClick: (time: TTimeOption) => void;
}

const TimeOption: FC<ITimeOptionProps> = ({
  showMoreChallengeTimes,
  timeOption,
  onClick,
}) => (
  <div className="timeOptions">
    <div
      className={clsx(
        "timeOptions__list",
        showMoreChallengeTimes && "timeOptions__list--seenAll",
      )}
    >
      {timeOptions.map((time) => (
        <TabButtonSquared
          color={timeOption === time ? "primary" : undefined}
          key={time}
          onClick={() => onClick(time)}
        >
          {time === "custom" && <More className="timeOptions__customTime" />}
          <p>{time}</p>
          {time !== "custom" && <p>minute</p>}
        </TabButtonSquared>
      ))}
    </div>
  </div>
);

export default TimeOption;
