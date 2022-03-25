import { useCallback } from "react";
import { sounds, TSounds } from "./constants";

const useSound = () => {
  const play = useCallback((sound: TSounds) => {
    let value = getComputedStyle(document.documentElement).getPropertyValue(
      sounds[sound],
    );

    if (value.trim().startsWith("url")) {
      value = value.slice(6, value.length - 2);
    }

    const audio = new Audio(value);

    audio.play();
  }, []);

  return play;
};

export default useSound;
