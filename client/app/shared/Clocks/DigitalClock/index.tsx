import { getStyleOnStatusClock } from "/client/app/data/utils";
import { useAppSelector } from "/client/app/store/hooks";
import React, { FCICC } from "react";
import Heading2 from "/client/app/shared/Typographies/Heading2";

interface IDigitalClock {
  time: string;
  status: "in" | "inactive" | "finishing";
}

const DigitalClock: FCICC<IDigitalClock> = ({ time, status }) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <Heading2
      name="digitalClock"
      token={{ token: time, args: [] }}
      classes={[]}
      keyboardFunctions={[]}
      className={getStyleOnStatusClock(status, classes)}
    />
  );
};

export default DigitalClock;
