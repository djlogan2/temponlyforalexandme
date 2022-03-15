import clsx from "clsx";
import { noop } from "lodash";
import React, { FC, useEffect, useState } from "react";
import Arrow from "../../icons/Arrow";
import More from "../../icons/More";
import { timeOptions } from "../constants";
import Subtitle from "../../Subtitle";
import TimeControl from "../TimeControl";
import { TTimeOption } from "../types";
import TabButtonSquared from "/client/app/shared/Buttons/TabButtonSquared";
import TextButton from "/client/app/shared/Buttons/TextButton";

interface ITimeOptionProps {
  className?: string;
  subtitle: string;
  onPickTime: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

const TimeOption: FC<ITimeOptionProps> = ({
  className,
  subtitle,
  onPickTime = noop,
}) => {
  const [customTime, showCustomTime] = useState(false);
  const [timeOption, setTimeOption] = useState<TTimeOption | undefined>();
  const [showMoreChallengeTimes, setShowMoreChallengeTimes] = useState(false);

  return customTime ? (
    <TimeControl
      className={className}
      onReturn={() => showCustomTime(false)}
      onPickTime={(field, value, shouldValidate) => {
        onPickTime(field, value, shouldValidate);
        setTimeOption("custom");
      }}
    />
  ) : (
    <>
      <Subtitle size="big" className="timeOptions__subtitle">
        {subtitle}
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
                if (time === "custom") {
                  showCustomTime(true);
                } else {
                  setTimeOption(time);
                  onPickTime("time", time);
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
