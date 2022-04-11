import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import i18next from "./i18next";
import Home from "./pages/Home";
import { challenges, gameservice } from "./Root";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import { useTheme } from "./theme";
import { TI18NDoc } from "./types";
import { ComponentsView, GameAnalysis, GameMarkup } from "/client/app/pages";

const App = () => {
  const customTheme = useTheme();
  const [isGameServiceReady, setIsGameServiceReady] = useState(false);
  const [isChallengesReady, setIsChallengesReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isChallengesReady && isLoggedIn) {
      const id = globalThis.icc.connection.user?.id || "";

      challenges.addChallenge({ minutes: 15 }, false, "w", [id], {
        minutes: 15,
      });
    }
  }, [isChallengesReady, isLoggedIn]);

  useEffect(() => {
    globalThis.icc.connection.events.on("loggedin", () => {
      setIsLoggedIn(true);
      globalThis.icc.connection.events.off("loggedin");
    });

    i18n.events.on("translationchanged", (translation: TI18NDoc) => {
      if (!translation) {
        return;
      }

      const { locale, token, text } = translation;

      i18next.addResource(locale, "translation", token, text);
    });

    gameservice.events.on("ready", () => {
      setIsGameServiceReady(true);
    });

    challenges.events.on("ready", () => {
      setIsChallengesReady(true);
    });
  }, []);

  const isAppReady =
    customTheme?.isReady &&
    isLoggedIn &&
    isGameServiceReady &&
    isChallengesReady;

  return isAppReady ? (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/game/:id">
          <GameMarkup />
        </Route>
        <Route exact path="/analysis">
          <GameAnalysis />
        </Route>
        <Route exact path="/ui-elements">
          <ComponentsView />
        </Route>
      </Switch>
    </Router>
  ) : (
    <LoadingPlaceholder />
  );
};

export default App;
