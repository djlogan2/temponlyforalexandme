import { getStyleOnStatusClock } from "/client/app/data/utils";
import React, { FCICC } from "react";
import "./index.scss";
import Heading2 from "/client/app/shared/Typographies/Heading2";
import clsx from "clsx";

interface IDigitalClock {
  time: string;
  status: "in" | "inactive" | "finishing";
  className?: string;
}

const DigitalClock: FCICC<IDigitalClock> = ({ time, status, className }) => (
  <Heading2
    name="digitalClock"
    token={{ token: time, args: [] }}
    classes={[]}
    keyboardFunctions={[]}
    className={clsx(getStyleOnStatusClock(status), className)}
  />
);

export default DigitalClock;
