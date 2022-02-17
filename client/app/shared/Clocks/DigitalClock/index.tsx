import clsx from "clsx";
import React, { FC, useEffect, useState } from "react";
import "./index.scss";
import { calculateTimeLeft } from "./utils";
import Heading2 from "/client/app/shared/Typographies/Heading2";

interface IDigitalClock {
  startTime: number;
  time: number;
  isMyTurn: boolean;
  initial: { hours?: number; minutes?: number; seconds?: number };
  className?: string;
}

const calcTime = (
  time: number,
  isMyTurn: boolean,
  initial: { hours?: number; minutes?: number; seconds?: number },
  startTime: number,
) => {
  console.log("here");
  const t1 = calculateTimeLeft(time);
  const { hours, minutes, seconds } = initial;
  const t2 = calculateTimeLeft(
    ((hours || 0) * 60 * 60 + (minutes || 0) * 60 + (seconds || 0)) * 1000,
  );

  if (isMyTurn && t1 === t2) {
    return startTime + time - Date.now();
  }

  return time;
};

const DigitalClock: FC<IDigitalClock> = ({
  time,
  isMyTurn,
  initial,
  startTime,
  className,
}) => {
  const [timeLeft, setTime] = useState(
    calcTime(time, isMyTurn, initial, startTime),
  );

  useEffect(() => {}, []);

  useEffect(() => {
    if (!isMyTurn) {
      return;
    }

    const interval = setInterval(() => {
      setTime((prevTime) => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isMyTurn]);

  return (
    <Heading2
      className={clsx(
        "digitalClock",
        isMyTurn && "digitalClock--inactive",
        className,
      )}
    >
      {calculateTimeLeft(timeLeft)}
    </Heading2>
  );
};

export default DigitalClock;
