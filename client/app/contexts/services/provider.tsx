import React, { useEffect, useState } from "react";

import SubscriptionService from "/imports/client/service/SubscriptionService";
import ClientThemeReadOnlyDao from "/imports/client/dao/ClientThemeReadOnlyDao";
import ClientTheme from "/lib/client/ClientTheme";
import ClientStartedGameReadOnlyDao from "/imports/client/dao/ClientStartedGameReadOnlyDao";
import GameService from "/imports/client/service/GameService";
import ClientChallengeButtonReadOnlyDao from "/imports/client/dao/ClientChallengeButtonReadOnlyDao";
import ClientChallengeReadOnlyDao from "/imports/client/dao/ClientChallengeReadOnlyDao";
import ChallengeService from "/imports/client/service/ChallengeService";

import { ServicesContextValue } from "./types";
import { ServicesContextProvider } from "./context";

const ServicesProvider: React.FC = ({ children }) => {
  const [services, setServices] = useState<undefined | ServicesContextValue>();

  useEffect(() => {
    const subscriptionService = new SubscriptionService(null);

    const themeDao = new ClientThemeReadOnlyDao(null, subscriptionService);
    const themeService = new ClientTheme(null, themeDao);

    const gameDao = new ClientStartedGameReadOnlyDao(null, subscriptionService);
    const gameService = new GameService(
      null,
      gameDao,
      globalThis.icc.connection,
    );

    const challengeDao = new ClientChallengeReadOnlyDao(
      null,
      subscriptionService,
    );
    const buttonDao = new ClientChallengeButtonReadOnlyDao(
      null,
      subscriptionService,
    );
    const challengeService = new ChallengeService(
      null,
      challengeDao,
      buttonDao,
    );

    setServices({
      themeService,
      gameService,
      challengeService,
    });
  }, []);

  return services ? (
    <ServicesContextProvider value={services}>
      {children}
    </ServicesContextProvider>
  ) : null;
};

export { ServicesProvider };
