import clsx from "clsx";
import React, { FC, useState } from "react";
import More from "../../icons/More";
import { timeOptions } from "../constants";
import { TTimeOption } from "../types";
import TabButtonSquared from "/client/app/shared/Buttons/TabButtonSquared";
import TextButton from "/client/app/shared/Buttons/TextButton";
import TimeControl from "../TimeControl";
import Arrow from "../../icons/Arrow";
import Subtitle from "../Subtitle";

interface ITimeOptionProps {
  className?: string;
}

const TimeOption: FC<ITimeOptionProps> = ({ className }) => {
  const [customTime, showCustomTime] = useState(false);
  const [timeOption, setTimeOption] = useState<TTimeOption>(15);
  const [showMoreChallengeTimes, setShowMoreChallengeTimes] = useState(false);

  return customTime ? (
    <TimeControl className={className} onReturn={() => showCustomTime(false)} />
  ) : (
    <>
      <Subtitle size="big" className="timeOptions__subtitle">
        Launch a new challenge
      </Subtitle>

      <div className={clsx("timeOptions", className)}>
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
              onClick={() => {
                setTimeOption(time);
                if (time === "custom") {
                  showCustomTime(true);
                }
              }}
            >
              {time === "custom" && (
                <More className="timeOptions__customTime" />
              )}
              <p>{time}</p>
              {time !== "custom" && <p>minute</p>}
            </TabButtonSquared>
          ))}
        </div>
      </div>
      <TextButton
        isFullWidth
        onClick={() => setShowMoreChallengeTimes((prev) => !prev)}
        className="timeOptions__showMore"
      >
        Show More
        <Arrow
          className={clsx(
            "timeOptions__arrowDown",
            showMoreChallengeTimes && "timeOptions__arrowUp",
          )}
        />
      </TextButton>
    </>
  );
};

export default TimeOption;
