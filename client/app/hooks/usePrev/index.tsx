import { useEffect, useRef } from "react";

const usePrev = <T extends unknown>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  return ref.current;
};

export default usePrev;
