import React, { useEffect, useState } from "react";

import GameService from "/imports/client/service/GameService";
import ClientChallengeButtonReadOnlyDao from "/imports/client/dao/ClientChallengeButtonReadOnlyDao";
import ClientChallengeReadOnlyDao from "/imports/client/dao/ClientChallengeReadOnlyDao";
import ClientStartedGameReadOnlyDao from "/imports/client/dao/ClientStartedGameReadOnlyDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import ChallengeService from "/imports/client/service/ChallengeService";
import { LoadingPlaceholder } from "../../shared";
import {
  ServicesContextProvider,
  ServicesContextValue,
  useServices,
} from "./context";
import App from "../../App";
import Theme, { ThemeProvider } from "../../theme";
import { GameSetupProvider } from "../gameSetup";

const ServicesProvider: React.FC = ({ children }) => {
  const [services, setServices] = useState<undefined | ServicesContextValue>();

  useEffect(() => {
    const subscriptionService = new SubscriptionService(null);

    const gameDao = new ClientStartedGameReadOnlyDao(null, subscriptionService);
    const buttonDao = new ClientChallengeButtonReadOnlyDao(
      null,
      subscriptionService,
    );
    const challengeDao = new ClientChallengeReadOnlyDao(
      null,
      subscriptionService,
    );

    const challengeService = new ChallengeService(
      null,
      challengeDao,
      buttonDao,
    );

    const gameService = new GameService(
      null,
      gameDao,
      globalThis.icc.connection,
    );

    const loggedIn = globalThis.icc.connection.onLoggedIn();
    const gameReady = gameService.onReady();
    const challengesReady = challengeService.onReady();

    Promise.all([gameReady, challengesReady, loggedIn]).then(() => {
      // gameService.events.on("fen", () => {});
      setServices({ gameService, challengeService, isServicesReady: true });
    });
  }, []);

  return (
    <ServicesContextProvider value={services}>
      {services ? (
        <ThemeProvider themeService={theme}>
          <GameSetupProvider challengeService={services.challengeService}>
            <Theme />
            <App />
          </GameSetupProvider>
        </ThemeProvider>
      ) : (
        <LoadingPlaceholder />
      )}
    </ServicesContextProvider>
  );
};

export { ServicesProvider, useServices };
