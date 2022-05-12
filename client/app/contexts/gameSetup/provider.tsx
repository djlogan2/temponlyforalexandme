import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { uniqBy } from "lodash";

import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";
import ChallengeService from "/imports/client/service/ChallengeService";
import GameService from "/imports/client/service/GameService";
import { ChallengeButton } from "/client/app/types";

import { GameSetupContextProvider } from "./context";
import { GameSetupContextValue } from "./types";

type GameSetupContextProps = {
  challengeService: ChallengeService;
  gameService: GameService;
};

const buildChallengeButton = (dbButton: any): ChallengeButton => ({
  id: dbButton._id,
  name: dbButton.name,
  time: dbButton.challenge.clocks.minutes,
  opponentTime: dbButton.challenge.opponentclocks?.minutes,
});

export const GameSetupProvider: FC<GameSetupContextProps> = ({
  challengeService,
  gameService,
  children,
}) => {
  const [challengeButtons, setChallengeButtons] = useState<ChallengeButton[]>(
    [],
  );
  const [lastComputerChallengeSetup, setLastComputerChallengeSetup] =
    useState<ComputerChallengeRecord | null>(null);

  const isButtonNameUnique = useCallback(
    (name: string): boolean =>
      !!challengeButtons.find((button) => button.name === name),
    [challengeButtons],
  );

  const startComputerGame = useCallback(
    (challengeSetup: ComputerChallengeRecord) => {
      setLastComputerChallengeSetup(challengeSetup);

      gameService.startComputerGame(challengeSetup);
    },
    [gameService, setLastComputerChallengeSetup],
  );

  const rematchComputerGame = useCallback(() => {
    if (!lastComputerChallengeSetup) {
      throw new Error("Unable to find last computer challenge setup");
    }

    gameService.startComputerGame(lastComputerChallengeSetup);
  }, [gameService, lastComputerChallengeSetup]);

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

  const contextValue: GameSetupContextValue = useMemo(
    () => ({
      challengeButtons,
      startComputerGame,
      rematchComputerGame,
    }),
    [challengeButtons, startComputerGame, rematchComputerGame],
  );

  return (
    <GameSetupContextProvider value={contextValue}>
      {children}
    </GameSetupContextProvider>
  );
};
