import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TChallengeTimeOption } from "../../types";
import ChallengeService from "/imports/client/service/ChallengeService";

interface IGameSetupContextValue {
  challengeTimeOptions: TChallengeTimeOption[];
}

interface IGameSetupContextProps {
  challengeService: ChallengeService;
  children: ReactNode;
}

const GameSetupContext = createContext<IGameSetupContextValue>({
  challengeTimeOptions: [],
});

export const useGameSetup = () => useContext(GameSetupContext);

export const GameSetupProvider: FC<IGameSetupContextProps> = ({
  challengeService,
  children,
}) => {
  const [challengeTimeOptions, setChallengeTimeOptions] = useState<
    TChallengeTimeOption[]
  >([]);

  const contextValue = useMemo(
    () => ({
      challengeTimeOptions,
    }),
    [challengeTimeOptions],
  );

  useEffect(() => {
    challengeService.buttonEvents.on("ready", () => {
      const challengeButtons = challengeService.getButtons();

      const newTimeOptions = challengeButtons.map<TChallengeTimeOption>(
        (button) => ({
          value: button.challenge.clocks.minutes,
          id: button.id,
        }),
      );

      setChallengeTimeOptions(newTimeOptions);
    });

    challengeService.buttonEvents.on("added", ({ challenge }) => {
      const newOption: TChallengeTimeOption = {
        id: challenge._id,
        value: challenge.clocks.minutes,
      };

      const newTimeOptions = [...challengeTimeOptions, newOption];

      setChallengeTimeOptions(newTimeOptions);
    });

    challengeService.buttonEvents.on("changed", ({ challenge }) => {
      const newOption: TChallengeTimeOption = {
        id: challenge._id,
        value: challenge.clocks.minutes,
      };

      const newTimeOptions = challengeTimeOptions.map((option) => {
        if (option.id === challenge._id) {
          return newOption;
        }

        return option;
      });

      setChallengeTimeOptions(newTimeOptions);
    });

    challengeService.buttonEvents.on("removed", (id) => {
      const newTimeOptions = challengeTimeOptions.filter(
        (option) => option.id !== id,
      );

      setChallengeTimeOptions(newTimeOptions);
    });
  }, []);

  return (
    <GameSetupContext.Provider value={contextValue}>
      {children}
    </GameSetupContext.Provider>
  );
};
