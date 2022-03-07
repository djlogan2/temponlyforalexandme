import clsx from "clsx";
import React, { FC, useEffect, useState } from "react";
import LongArrow from "../../icons/LongArrow";
import Card from "../Card";
import Subtitle from "../Subtitle";
import "./index.scss";
import TextButton from "/client/app/shared/Buttons/TextButton";
import Checkbox from "/client/app/shared/Checkbox";
import Input from "/client/app/shared/Input";

interface ITimeControlProps {
  className?: string;
  onReturn: () => void;
  onPickTime: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

const TimeControl: FC<ITimeControlProps> = ({
  className,
  onReturn,
  onPickTime,
}) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    onPickTime("time", +(seconds / 60).toFixed(2) + minutes);
  }, [minutes, seconds]);

  return (
    <Card className={clsx("timeControl", className)}>
      <Subtitle className="timeControl__subtitle">Time control</Subtitle>
      <div className="timeControl__inputs">
        <Input
          label="Minutes"
          name="move1"
          placeholder="00m"
          type="number"
          onChange={(e) => setMinutes(+e.target.value)}
        />
        <Input
          label="Seconds"
          name="mov2"
          placeholder="00m"
          type="number"
          onChange={(e) => setSeconds(+e.target.value)}
        />
      </div>
      <p className="timeControl__checkbox">
        <Checkbox name="checkbox" />
        <span className="timeControl__textPlaceholder">Unlimited</span>
      </p>

      <TextButton className="timeControl__popularTimes" onClick={onReturn}>
        Popular times <LongArrow />
      </TextButton>
    </Card>
  );
};

export default TimeControl;
