import { getStyleOnStatusClock } from "/client/app/data/utils";
import React, { FCICC } from "react";
import "./index.scss";
import Heading2 from "/client/app/shared/Typographies/Heading2";

interface IDigitalClock {
  time: string;
  status: "in" | "inactive" | "finishing";
}

const DigitalClock: FCICC<IDigitalClock> = ({ time, status }) => (
  <Heading2
    name="digitalClock"
    token={{ token: time, args: [] }}
    classes={[]}
    keyboardFunctions={[]}
    className={getStyleOnStatusClock(status)}
  />
);

export default DigitalClock;
