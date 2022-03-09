import { useCallback } from "react";
import { sounds, TSounds } from "./constants";

const useSound = (sound: TSounds) => {
  const play = useCallback(() => {
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
