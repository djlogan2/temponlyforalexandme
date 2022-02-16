import React, { FCICC, useEffect, useState } from "react";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";
import Clienti18n from "/lib/client/Clienti18n";
import ClientTheme from "/lib/client/ClientTheme";
import { withTranslations } from "./hocs/withTranslations";
import Theme, { ThemeProvider } from "./theme";
import GameService from "/imports/client/service/GameService";
import ClientServer from "/lib/client/ClientServer";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import App from "./App";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import ClientStartedGameReadOnlyDao from "/imports/client/dao/ClientStartedGameReadOnlyDao";

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
const themedao = new ThemeReadOnlyDao(null, subscriptionservice);

const i18nClient = new Clienti18n(i18ndao);
const theme = new ClientTheme(null, themedao);

const gamedao = new ClientStartedGameReadOnlyDao(null, subscriptionservice);

export const gameservice = new GameService(
  null,
  gamedao,
  globalThis.icc.connection,
);

function loggedin() {
  globalThis.icc.connection.events.off("loggedin", loggedin);
}

const Root: FCICC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (globalThis.icc.connection.user) {
      setIsLoggedIn(true);
      return;
    }
    globalThis.icc.connection.events.on("loggedin", () => {
      setIsLoggedIn(true);
      loggedin();
    });
  }, []);

  return isLoggedIn ? (
    <ThemeProvider themeService={theme}>
      <Theme />
      <App {...props} />
    </ThemeProvider>
  ) : (
    <LoadingPlaceholder />
  );
};

export default withTranslations(Root);
