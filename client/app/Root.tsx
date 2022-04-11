import React, { useEffect, useState } from "react";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import App from "./App";
import { LoadingPlaceholder } from "./shared";
import Theme, { ThemeProvider } from "./theme";
import ClientChallengeButtonReadOnlyDao from "/imports/client/dao/ClientChallengeButtonReadOnlyDao";
import ClientChallengeReadOnlyDao from "/imports/client/dao/ClientChallengeReadOnlyDao";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ClientStartedGameReadOnlyDao from "/imports/client/dao/ClientStartedGameReadOnlyDao";
import ClientThemeReadOnlyDao from "/imports/client/dao/ClientThemeReadOnlyDao";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import ChallengeService from "/imports/client/service/ChallengeService";
import GameService from "/imports/client/service/GameService";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import Clienti18n from "/lib/client/Clienti18n";
import ClientServer from "/lib/client/ClientServer";
import ClientTheme from "/lib/client/ClientTheme";

//---
globalThis.subscriptionservice = new SubscriptionService(null);
globalThis.loggerconfigdao = new ReadOnlyLoggerConfigurationDao(
  null,
  window.subscriptionservice,
);
const userdao = new CommonReadOnlyUserDao(null);

globalThis.icc = new ClientServer(userdao);
//---

const subscriptionservice = new SubscriptionService(null);

const i18ndao = new Clienti18nReadOnlyDao(null, subscriptionservice);
const themedao = new ClientThemeReadOnlyDao(null, subscriptionservice);

const i18nClient = new Clienti18n(null, i18ndao);
const theme = new ClientTheme(null, themedao);

const gamedao = new ClientStartedGameReadOnlyDao(null, subscriptionservice);

const challengedao = new ClientChallengeReadOnlyDao(null, subscriptionservice);
const buttondao = new ClientChallengeButtonReadOnlyDao(
  null,
  subscriptionservice,
);
export const challenges = new ChallengeService(null, challengedao, buttondao);

export const gameservice = new GameService(
  null,
  gamedao,
  globalThis.icc.connection,
);

const Root = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const GLOBAL_SERVICES = [
      [gameservice, "ready"],
      [challenges, "ready"],
      [globalThis.icc.connection, "loggedin"],
    ] as const;

    let servicesReady = 0;

    GLOBAL_SERVICES.forEach(([service, e]) => {
      const onServiceReady = () => {
        servicesReady++;

        if (servicesReady === GLOBAL_SERVICES.length) {
          setIsAppReady(true);
        }

        service.events.off(e as any, onServiceReady);
      };

      service.events.on(e as any, onServiceReady);
    });
  }, []);

  return isAppReady ? (
    <ThemeProvider themeService={theme}>
      <Theme />
      <App />
    </ThemeProvider>
  ) : (
    <LoadingPlaceholder />
  );
};

export default Root;
