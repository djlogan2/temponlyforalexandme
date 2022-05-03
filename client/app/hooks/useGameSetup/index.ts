import { useEffect, useState } from "react";
import { challenges } from "../../Root";

const getChallengeTimeOptions = () =>
  challenges.getButtons().map((button) => button.challenge.clocks.minutes);

const useGameSetup = () => {
  const [challengeTimeOptions, setChallengeTimeOptions] = useState<number[]>(
    [],
  );

  useEffect(() => {
    challenges.buttonEvents.on("ready", (data) => {
      const initialTimeOptions = getChallengeTimeOptions();
      setChallengeTimeOptions(initialTimeOptions);
    });

    challenges.buttonEvents.on("changed", (data) => {
      setChallengeTimeOptions(data);
    });

    challenges.buttonEvents.on("added", (data) => {
      setChallengeTimeOptions(data);
    });

    challenges.buttonEvents.on("removed", (data) => {
      setChallengeTimeOptions(data);
    });

    const timeOptions = getChallengeTimeOptions();
    setChallengeTimeOptions(timeOptions);
  }, []);

  return { challengeTimeOptions };
};

export default useGameSetup;
