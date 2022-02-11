import {
  CLOCK_STATUS_FINISHING,
  CLOCK_STATUS_IN,
  CLOCK_STATUS_INACTIVE,
} from "../../constants/index";
import { getStyleOnStatusClock } from "..";

describe("getStylesOnStatusClock function", () => {
  test("Should return 'digitalClock'", () => {
    expect(getStyleOnStatusClock(CLOCK_STATUS_IN)).toBe("digitalClock");
  });

  test("Should return 'digitalClockInactive'", () => {
    expect(getStyleOnStatusClock(CLOCK_STATUS_INACTIVE)).toBe(
      "digitalClockInactive",
    );
  });

  test("Should return 'digitalClockError'", () => {
    expect(getStyleOnStatusClock(CLOCK_STATUS_FINISHING)).toBe(
      "digitalClockError",
    );
  });

  test("Should return 'digitalClock' by default", () => {
    expect(getStyleOnStatusClock("")).toBe("digitalClock");
  });
});
