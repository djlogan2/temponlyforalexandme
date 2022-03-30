import { intervalToDuration } from "date-fns";

import {
  CLOCK_STATUS_FINISHING,
  CLOCK_STATUS_IN,
  CLOCK_STATUS_INACTIVE,
} from "/client/app/data/constants";

export const getStyleOnStatusClock = (status: string) => {
  switch (status) {
    case CLOCK_STATUS_IN:
      return "digitalClock";
    case CLOCK_STATUS_INACTIVE:
      return "digitalClockInactive";
    case CLOCK_STATUS_FINISHING:
      return "digitalClockError";
    default:
      return "digitalClock";
  }
};

export const calculateTimeLeft = (timePassed: number) => {
  const { hours, minutes, seconds } = intervalToDuration({
    start: 0,
    end: timePassed,
  });

  const durationLeft = [hours, minutes, seconds]
    .map((t) => (`${t}`.length === 1 ? `0${t}` : t))
    .join(":");

  return durationLeft;
};

export const calcTime = (
  time: number,
  isMyTurn: boolean,
  initial: number,
  startTime: number,
) => {
  const t1 = calculateTimeLeft(time);
  const t2 = calculateTimeLeft((initial || 0) * 60 * 1000);

  if (isMyTurn && t1 === t2) {
    const t = startTime + time - Date.now();
    return Math.max(t, 0);
  }

  return time;
};
