import React, { FC, useEffect, useState } from "react";

import clsx from "clsx";

import { useTranslate } from "/client/app/hooks";
import TextButton from "/client/app/shared/Buttons/TextButton";
import Checkbox from "/client/app/shared/Checkbox";
import Input from "/client/app/shared/Input";
import LongArrow from "../../icons/LongArrow";
import Card from "../../Card";
import Subtitle from "../../Subtitle";
import "./index.scss";

interface ITimeControlProps {
  className?: string;
  onReturn: () => void;
  onPickTime: (value: number) => void;
}

const TimeControl: FC<ITimeControlProps> = ({
  className,
  onReturn,
  onPickTime,
}) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    onPickTime(+(seconds / 60).toFixed(2) + minutes);
  }, [minutes, seconds]);

  const { t } = useTranslate();

  return (
    <Card className={clsx("timeControl", className)}>
      <Subtitle className="timeControl__subtitle">{t("timeControl")}</Subtitle>
      <div className="timeControl__inputs">
        <Input
          label={t("minutes")}
          name="move1"
          placeholder={t("minutesWithAmount", { min: "00" })}
          type="number"
          onChange={(e) => setMinutes(+e.target.value)}
        />
        <Input
          label={t("seconds")}
          name="mov2"
          placeholder={t("secondsWithAmount", { sec: "00" })}
          type="number"
          onChange={(e) => setSeconds(+e.target.value)}
        />
      </div>
      <p className="timeControl__checkbox">
        <Checkbox name="checkbox" />
        <span className="timeControl__textPlaceholder">{t("unlimited")}</span>
      </p>

      <TextButton className="timeControl__popularTimes" onClick={onReturn}>
        {t("popularTimes")} <LongArrow />
      </TextButton>
    </Card>
  );
};

export default TimeControl;
