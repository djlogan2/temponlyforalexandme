import clsx from "clsx";
import React, { FC, useEffect, useState } from "react";
import "./index.scss";
import { calculateTimeLeft } from "/client/app/data/utils";
import Heading2 from "/client/app/shared/Typographies/Heading2";

interface IDigitalClock {
  time: number;
  isMyTurn: boolean;
  className?: string;
}

const DigitalClock: FC<IDigitalClock> = ({ time, isMyTurn, className }) => {
  const [timeLeft, setTime] = useState(time);

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
