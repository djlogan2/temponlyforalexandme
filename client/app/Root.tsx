import React from "react";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import App from "./App";
import Theme, { ThemeProvider } from "./theme";
import ClientChallengeButtonReadOnlyDao from "/imports/client/dao/ClientChallengeButtonReadOnlyDao";
import ClientChallengeReadOnlyDao from "/imports/client/dao/ClientChallengeReadOnlyDao";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ClientStartedGameReadOnlyDao from "/imports/client/dao/ClientStartedGameReadOnlyDao";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import ClientThemeReadOnlyDao from "/imports/client/dao/ClientThemeReadOnlyDao";
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

// const minutes = Math.round(Math.random() * 600);
// globalThis.connection.loggedin(() => {
//   challenges.addChallenge({ minutes }, true);
// });

const Root = () => (
  <ThemeProvider themeService={theme}>
    <Theme />
    <App />
  </ThemeProvider>
);

export default Root;
