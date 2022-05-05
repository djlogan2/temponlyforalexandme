import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { uniqBy } from "lodash";

import ChallengeService from "/imports/client/service/ChallengeService";
import { TChallengeButton } from "../../types";
import { GameSetupContext } from "./context";

interface IGameSetupContextProps {
  challengeService: ChallengeService;
  children: ReactNode;
}

const buildChallengeButton = (dbButton: any): TChallengeButton => ({
  id: dbButton._id,
  name: dbButton.name,
  time: dbButton.challenge.clocks.minutes,
  opponentTime: dbButton.challenge.opponentclocks?.minutes,
});

export const GameSetupProvider: FC<IGameSetupContextProps> = ({
  challengeService,
  children,
}) => {
  const [challengeButtons, setChallengeButtons] = useState<TChallengeButton[]>(
    [],
  );

  const contextValue = useMemo(
    () => ({
      challengeButtons,
    }),
    [challengeButtons],
  );

  const isButtonNameUnique = useCallback(
    (name: string): boolean =>
      !!challengeButtons.find((button) => button.name === name),
    [challengeButtons],
  );

  useEffect(() => {
    challengeService.buttonEvents.on("ready", () => {
      let dbButtons = challengeService.getButtons() || [];
      dbButtons = uniqBy(dbButtons, "name");

      const newButtons = dbButtons.map(buildChallengeButton);

      setChallengeButtons(newButtons);
    });

    challengeService.buttonEvents.on("added", (dbButton) => {
      if (!isButtonNameUnique(dbButton.name)) {
        return;
      }

      const newButton = buildChallengeButton(dbButton);
      const newButtons = [...challengeButtons, newButton];

      setChallengeButtons(newButtons);
    });

    challengeService.buttonEvents.on("changed", (dbButton) => {
      if (!isButtonNameUnique(dbButton.name)) {
        return;
      }

      const newButton = buildChallengeButton(dbButton);

      const newButtons = challengeButtons.map((button) => {
        if (button.id === dbButton._id) {
          return newButton;
        }

        return button;
      });

      setChallengeButtons(newButtons);
    });

    challengeService.buttonEvents.on("removed", (id) => {
      const newButtons = challengeButtons.filter((button) => button.id !== id);

      setChallengeButtons(newButtons);
    });
  }, []);

  return (
    <GameSetupContext.Provider value={contextValue}>
      {children}
    </GameSetupContext.Provider>
  );
};
