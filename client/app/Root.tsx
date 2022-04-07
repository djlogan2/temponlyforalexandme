import React, { useEffect, useState } from "react";
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
import i18next from "./i18next";
import { LoadingPlaceholder } from "./shared";
import { TI18NDoc } from "./types";

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

i18n.events.on("translationchanged", (translation: TI18NDoc) => {
  if (!translation) {
    return;
  }

  const { locale, token, text } = translation;

  i18next.addResource(locale, "translation", token, text);
});

const Root = () => {
  const [isGameServiceReady, setIsGameServiceReady] = useState(false);
  const [isChallengesReady, setIsChallengesReady] = useState(false);
  const [isChallengesButtonsReady, setIsChallengesButtonsReady] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const onGameServiceReady = () => {
      setIsGameServiceReady(true);

      gameservice.events.off("ready", onGameServiceReady);
    };

    const onChallengesReady = () => {
      setIsChallengesReady(true);

      challenges.events.off("ready", onChallengesReady);
    };

    const onChallengesButtonsReady = () => {
      setIsChallengesButtonsReady(true);

      challenges.buttonEvents.off("ready", onChallengesButtonsReady);
    };

    const onLogin = () => {
      setIsLoggedIn(true);
      globalThis.icc.connection.events.off("loggedin", onLogin);
    };

    gameservice.events.on("ready", onGameServiceReady);
    challenges.events.on("ready", onChallengesReady);
    challenges.buttonEvents.on("ready", onChallengesButtonsReady);
    globalThis.icc.connection.events.on("loggedin", onLogin);
  });

  const isAppReady =
    isGameServiceReady &&
    isChallengesReady &&
    isChallengesButtonsReady &&
    isLoggedIn;

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
