import {
  CLOCK_STATUS_FINISHING,
  CLOCK_STATUS_IN,
  CLOCK_STATUS_INACTIVE,
} from "/client/app/data/constants";

export const getStyleOnStatusClock = (
  status: string,
  classes: { [key: string]: string },
) => {
  switch (status) {
    case CLOCK_STATUS_IN:
      return classes.digitalClock;
    case CLOCK_STATUS_INACTIVE:
      return classes.digitalClockInactive;
    case CLOCK_STATUS_FINISHING:
      return classes.digitalClockError;
    default:
      return classes.digitalClock;
  }
};
