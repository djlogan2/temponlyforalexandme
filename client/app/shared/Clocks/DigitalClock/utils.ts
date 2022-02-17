import { intervalToDuration } from "date-fns";

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
