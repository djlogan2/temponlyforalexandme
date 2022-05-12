import React, { FC, useEffect, useState } from "react";

import { LoadingPlaceholder } from "./shared";
import { GameSetupProvider } from "./contexts/gameSetup";
import { useServices } from "./contexts/services";
import { ThemeProvider } from "./contexts/theme/provider";

export const ProvidersContainer: FC = ({ children }) => {
  const { themeService, challengeService, gameService } = useServices();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loggedIn = globalThis.icc.connection.onLoggedIn();
    const gameReady = gameService.onReady();
    const challengesReady = challengeService.onReady();

    Promise.all([gameReady, challengesReady, loggedIn]).then(() => {
      setIsReady(true);
    });

    // TODO: Investigate why gameService's dao doesn't work without on() listener
    gameService.events.on("ready", () => {});
  }, []);

  return isReady ? (
    <GameSetupProvider
      challengeService={challengeService}
      gameService={gameService}
    >
      <ThemeProvider themeService={themeService}>{children}</ThemeProvider>
    </GameSetupProvider>
  ) : (
    <LoadingPlaceholder />
  );
};
