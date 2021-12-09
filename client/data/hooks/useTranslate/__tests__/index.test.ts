import { renderHook } from "@testing-library/react-hooks";
import useTranslate from "../index";

describe("useTranslate hook", () => {
  test("Should return signup", () => {
    const { result } = renderHook(() => useTranslate("signup"));

    expect(result.current()).toBe("signup");
  });
});
