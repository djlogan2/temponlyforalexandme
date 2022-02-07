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
