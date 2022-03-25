import React, { useEffect } from "react";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import App from "./App";
import Theme, { ThemeProvider } from "./theme";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ClientStartedGameReadOnlyDao from "/imports/client/dao/ClientStartedGameReadOnlyDao";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";
import GameService from "/imports/client/service/GameService";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import Clienti18n from "/lib/client/Clienti18n";
import ClientServer from "/lib/client/ClientServer";
import ClientTheme from "/lib/client/ClientTheme";
import "./i18next";

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

const Root = () => {
  useEffect(() => {
    if (globalThis.icc.connection.user) {
      return;
    }
    globalThis.icc.connection.events.on("loggedin", () => {
      loggedin();
    });
  }, []);

  return (
    <ThemeProvider themeService={theme}>
      <Theme />
      <App />
    </ThemeProvider>
  );
};

export default Root;
