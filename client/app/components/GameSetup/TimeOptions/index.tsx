import React, { FC, useMemo, useState } from "react";

import clsx from "clsx";

import { TChallengeButton } from "/client/app/types";
import { useGameSetup } from "/client/app/contexts/gameSetupContext";
import { useTranslate } from "/client/app/hooks";
import TabButtonSquared from "/client/app/shared/Buttons/TabButtonSquared";
import TextButton from "/client/app/shared/Buttons/TextButton";
import Arrow from "../../icons/Arrow";
import More from "../../icons/More";
import Subtitle from "../../Subtitle";
import TimeControl from "../TimeControl";

const CUSTOM = "custom";

interface ITimeOptionProps {
  subtitle: string;
  onPickTime: (value: TChallengeButton | number) => Promise<void>;
  className?: string;
  onValidChange?: (value: boolean) => void;
  onUnlimitedChange?: (value: boolean) => void;
}
const TimeOption: FC<ITimeOptionProps> = ({
  className,
  subtitle,
  onPickTime,
  onValidChange,
  onUnlimitedChange,
}) => {
  const { t } = useTranslate();
  const { challengeButtons } = useGameSetup();
  const [customTime, setCustomTime] = useState(false);
  const [challengeButton, setChallengeButton] = useState<TChallengeButton>(
    challengeButtons[0],
  );
  const [showMoreChallengeTimes, setShowMoreChallengeTimes] = useState(false);

  const timeOptions: [...TChallengeButton[], typeof CUSTOM] = useMemo(
    () => [...challengeButtons, CUSTOM],
    [challengeButtons],
  );

  return customTime ? (
    <TimeControl
      className={className}
      onReturn={() => setCustomTime(false)}
      onPickTime={(value) => {
        onPickTime(value);
        setCustomTime(true);
      }}
      onValidChange={onValidChange}
      onUnlimitedChange={onUnlimitedChange}
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
            option === CUSTOM ? (
              <TabButtonSquared
                key={option}
                onClick={() => setCustomTime(true)}
              >
                <More className="timeOptions__customTime" />
                <p>{option}</p>
              </TabButtonSquared>
            ) : (
              <TabButtonSquared
                color={
                  option.name === challengeButton.name ? "primary" : undefined
                }
                key={option.id}
                onClick={() => {
                  setChallengeButton(option);
                  onPickTime(option);
                }}
              >
                <p>{option.name}</p>
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
