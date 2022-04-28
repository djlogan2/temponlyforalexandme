import { useEffect, useState } from "react";
import { challenges } from "../../Root";

const getChallengeTimeOptions = () =>
  challenges.getButtons().map((button) => button.challenge.clocks.minutes);

const useGameSetup = () => {
  const [challengeTimeOptions, setChallengeTimeOptions] = useState<number[]>(
    [],
  );

  useEffect(() => {
    challenges.buttonEvents.on("ready", () => {
      const initialTimeOptions = getChallengeTimeOptions();
      setChallengeTimeOptions(initialTimeOptions);
    });

    const timeOptions = getChallengeTimeOptions();
    setChallengeTimeOptions(timeOptions);
  }, []);

  return { challengeTimeOptions };
};

export default useGameSetup;
