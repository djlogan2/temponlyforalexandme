import { Tracker } from "meteor/tracker";
import { useEffect, useState } from "react";
import Emitter from "../../../../imports/emitter";
import { EEmitterEvents } from "./events";

interface IUseEmitterProps {
  event: EEmitterEvents;
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
  const [data, setData] = useState<T | null>(null);

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
        setData(null);
      }
    };
  }, [tracker]);

  return { data };
};

export default useEventEmitter;
