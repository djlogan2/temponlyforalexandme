import { useCallback } from "react";

import { Sound, sounds } from "./constants";

export const useSound = () => {
  const play = useCallback((sound: Sound) => {
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
