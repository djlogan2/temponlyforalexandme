import { Tracker } from "meteor/tracker";
import { useEffect, useState } from "react";
import Emitter from "../../../../imports/emitter";
import { EEmitterEvents } from "./events";

interface IUseEmitterProps<T> {
  event: EEmitterEvents;
  tracker?: () => Tracker.Computation;
  shouldTrackerUnmount?: boolean;
  shouldUseOnce?: boolean;
  defaultValue?: T | null;
}

const useEventEmitter = <T>({
  event,
  tracker,
  shouldTrackerUnmount,
  defaultValue = null,
  shouldUseOnce = false,
}: IUseEmitterProps<T>) => {
  const [data, setData] = useState<T | null>(defaultValue);

  useEffect(() => {
    Emitter[shouldUseOnce ? "once" : "on"]<T>(event, (eventData) => {
      setData(eventData);
    });

    let sub: Tracker.Computation;
    if (tracker) {
      sub = tracker();
    }

    return () => {
      Emitter.off(event);
      if (sub && shouldTrackerUnmount) {
        sub.stop();
        setData(null);
      }
    };
  }, [tracker]);

  return { data };
};

export default useEventEmitter;
