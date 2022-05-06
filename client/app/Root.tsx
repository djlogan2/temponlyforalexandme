import React, { FC } from "react";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import App from "./App";
import { GameSetupProvider } from "./contexts/gameSetup";
import { ServicesProvider, useServices } from "./contexts/services";
import { LoadingPlaceholder } from "./shared";
import Theme, { ThemeProvider } from "./theme";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ClientThemeReadOnlyDao from "/imports/client/dao/ClientThemeReadOnlyDao";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
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

const i18ndao = new Clienti18nReadOnlyDao(null, subscriptionservice);
const themedao = new ClientThemeReadOnlyDao(null, subscriptionservice);

const i18nClient = new Clienti18n(null, i18ndao);
const theme = new ClientTheme(null, themedao);

const ServicesCheckWrapper: FC = () => {
  const { challengeService, isServicesReady } = useServices();

  return isServicesReady ? (
    <GameSetupProvider challengeService={challengeService}>
      <ThemeProvider themeService={theme}>
        <Theme />
        <App />
      </ThemeProvider>
      <LoadingPlaceholder />
    </GameSetupProvider>
  ) : (
    <LoadingPlaceholder />
  );
};

const Root = () => (
  <ServicesProvider>
    <ServicesCheckWrapper />
  </ServicesProvider>
);

export default Root;
