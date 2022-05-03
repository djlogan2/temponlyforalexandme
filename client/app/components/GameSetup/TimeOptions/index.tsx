import clsx from "clsx";
import { noop } from "lodash";
import React, { FC, useMemo, useState } from "react";
import Arrow from "../../icons/Arrow";
import More from "../../icons/More";
import Subtitle from "../../Subtitle";
import TimeControl from "../TimeControl";
import { TChallengeTimeOption } from "/client/app/types";
import { useGameSetup } from "/client/app/contexts/gameSetupContext";
import { useTranslate } from "/client/app/hooks";
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
  onCustomTimeToggled?: (newValue: boolean) => void;
}
const TimeOption: FC<ITimeOptionProps> = ({
  className,
  subtitle,
  onPickTime = noop,
  onCustomTimeToggled,
}) => {
  const { t } = useTranslate();
  const { challengeTimeOptions } = useGameSetup();
  const [customTime, setCustomTime] = useState(false);
  const [timeOption, setTimeOption] = useState<number | "custom" | undefined>();
  const [showMoreChallengeTimes, setShowMoreChallengeTimes] = useState(false);

  const timeOptions: [...TChallengeTimeOption[], "custom"] = useMemo(
    () => [...challengeTimeOptions, "custom"],
    [challengeTimeOptions],
  );

  const toggleCustomTime = (newValue: boolean): void => {
    setCustomTime(newValue);

    if (onCustomTimeToggled) {
      onCustomTimeToggled(newValue);
    }
  };

  return customTime ? (
    <TimeControl
      className={className}
      onReturn={() => toggleCustomTime(false)}
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
          {timeOptions.map((option) =>
            option === "custom" ? (
              <TabButtonSquared
                key={option}
                onClick={() => {
                  toggleCustomTime(true);
                }}
              >
                <More className="timeOptions__customTime" />
                <p>{option}</p>
              </TabButtonSquared>
            ) : (
              <TabButtonSquared
                color={option.value === timeOption ? "primary" : undefined}
                key={option.id}
                onClick={() => {
                  setTimeOption(option.value);
                  onPickTime("time", option.value);
                }}
              >
                <p>{option.value}</p>
                <p>{t("minute")}</p>
              </TabButtonSquared>
            ),
          )}
        </div>
      </div>
      <TextButton
        isFullWidth
        onClick={() => setShowMoreChallengeTimes((prev) => !prev)}
        className="timeOptions__showMore"
      >
        {t("showMore")}
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
