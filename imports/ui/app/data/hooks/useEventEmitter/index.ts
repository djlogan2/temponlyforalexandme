import { useEffect, useState } from "react";
import Emitter from "../../../../../Emitter";

interface IUseEmitterProps {
  event: string;
  tracker?: () => Tracker.Computation;
  shouldTrackerUnmount?: boolean;
}

const useEventEmitter = <T>({
  event,
  tracker,
  shouldTrackerUnmount,
}: IUseEmitterProps) => {
  const [data, setData] = useState<T>(null);

  useEffect(() => {
    let sub: Tracker.Computation;
    if (tracker) {
      sub = tracker();
    }

    Emitter.on<T>(event, (eventData) => {
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
