import clsx from "clsx";
import React, { FC } from "react";
import Card from "../Card";
import Subtitle from "../Subtitle";
import Checkbox from "/client/app/shared/Checkbox";
import Input from "/client/app/shared/Input";
import "./index.scss";
import TextButton from "/client/app/shared/Buttons/TextButton";
import LongArrow from "../../icons/LongArrow";

interface ITimeControlProps {
  className?: string;
  onReturn: () => void;
}

const TimeControl: FC<ITimeControlProps> = ({ className, onReturn }) => (
  <Card className={clsx("timeControl", className)}>
    <Subtitle className="timeControl__subtitle">Time control</Subtitle>
    <div className="timeControl__inputs">
      <Input label="Move" name="move1" placeholder="00m" type="number" />
      <Input label="Move" name="mov2" placeholder="00m" type="number" />
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

export default TimeControl;
