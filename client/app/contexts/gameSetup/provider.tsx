import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { uniqBy } from "lodash";

import ChallengeService from "/imports/client/service/ChallengeService";
import { ChallengeButton } from "/client/app/types";

import { GameSetupContextProvider } from "./context";
import { GameSetupContextValue } from "./types";

type GameSetupContextProps = {
  challengeService: ChallengeService;
};

const buildChallengeButton = (dbButton: any): ChallengeButton => ({
  id: dbButton._id,
  name: dbButton.name,
  time: dbButton.challenge.clocks.minutes,
  opponentTime: dbButton.challenge.opponentclocks?.minutes,
});

export const GameSetupProvider: FC<GameSetupContextProps> = ({
  children,
  challengeService,
}) => {
  const [challengeButtons, setChallengeButtons] = useState<ChallengeButton[]>(
    [],
  );

  const contextValue: GameSetupContextValue = useMemo(
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
    <GameSetupContextProvider value={contextValue}>
      {children}
    </GameSetupContextProvider>
  );
};
