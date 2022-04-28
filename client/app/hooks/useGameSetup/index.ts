import { useEffect, useState } from "react";
import { challenges } from "../../Root";

const useGameSetup = () => {
  const [challengeTimeOptions, setChallengeTimeOptions] = useState<number[]>(
    [],
  );

  useEffect(() => {
    challenges.buttonEvents.on("ready", () => {
      const initialTimeOptions = challenges
        .getButtons()
        .map((button) => button.challenge.clocks.minutes);

      setChallengeTimeOptions(initialTimeOptions);
    });
  }, []);

  return { challengeTimeOptions };
};

export default useGameSetup;
