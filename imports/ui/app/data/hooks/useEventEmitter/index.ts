import { useEffect, useState } from "react";
import Emitter from "../../../../../emitter";

interface IUseEmitterProps {
  event: string;
  tracker?: () => Tracker.Computation;
  shouldTrackerUnmount?: boolean;
  shouldUseOnce?: boolean;
}

const useEventEmitter = <T>({
  event,
  tracker,
  shouldTrackerUnmount,
  shouldUseOnce = false,
}: IUseEmitterProps) => {
  const [data, setData] = useState<T>(null);

  useEffect(() => {
    let sub: Tracker.Computation;
    if (tracker) {
      sub = tracker();
    }

    Emitter[shouldUseOnce ? "once" : "on"]<T>(event, (eventData) => {
      setData(eventData);
    });

    return () => {
      Emitter.off(event);
      if (sub && shouldTrackerUnmount) {
        sub.stop();
      }
    };
  }, []);

  return { data };
};

export default useEventEmitter;
