import { renderHook, act } from "@testing-library/react-hooks";
import { Tracker } from "meteor/tracker";
import useEventEmitter from "../index";
import Emitter from "../../../../../zold/emitter";
import { EEmitterEvents } from "../events";

describe("useEventEmitter hook", () => {
  test("Should return a null on first run", () => {
    const { result } = renderHook(() =>
      useEventEmitter({
        event: EEmitterEvents.I18N_CHANGE,
      }),
    );

    expect(result.current.data).toBe(null);
  });

  test("Should listen to changes", () => {
    const { result } = renderHook(() =>
      useEventEmitter<string>({
        event: EEmitterEvents.I18N_CHANGE,
      }),
    );

    act(() => {
      Emitter.emit(EEmitterEvents.I18N_CHANGE, "test");
    });

    expect(result.current.data).toBe("test");

    act(() => {
      Emitter.emit(EEmitterEvents.I18N_CHANGE, "test again");
    });

    expect(result.current.data).toBe("test again");
  });

  test("Should listen to changes just once", () => {
    const { result } = renderHook(() =>
      useEventEmitter<string>({
        event: EEmitterEvents.I18N_CHANGE,
        shouldUseOnce: true,
      }),
    );

    act(() => {
      Emitter.emit(EEmitterEvents.I18N_CHANGE, "test");
    });

    expect(result.current.data).toBe("test");

    act(() => {
      Emitter.emit(EEmitterEvents.I18N_CHANGE, "test again");
    });

    expect(result.current.data).toBe("test");
  });

  test("Should subscribe to tracker", () => {
    const tracker = jest.fn();

    const {} = renderHook(() =>
      useEventEmitter<string>({
        event: EEmitterEvents.I18N_CHANGE,
        shouldUseOnce: true,
        tracker: () => {
          return tracker() as unknown as Tracker.Computation;
        },
      }),
    );

    expect(tracker.mock.calls.length).toBe(1);
  });

  test("Should unsubscribe from tracker when component unmounts", () => {
    const stop = jest.fn();
    const tracker = jest.fn(() => ({
      stop,
    }));

    const { unmount } = renderHook(() =>
      useEventEmitter<string>({
        event: EEmitterEvents.I18N_CHANGE,
        shouldUseOnce: true,
        tracker: () => {
          return tracker() as unknown as Tracker.Computation;
        },
        shouldTrackerUnmount: true,
      }),
    );

    unmount();
    expect(stop.mock.calls.length).toBe(1);
  });
});
