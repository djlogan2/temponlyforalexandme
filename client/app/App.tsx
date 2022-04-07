import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import i18next from "./i18next";
import { ComponentsView, GameAnalysis, GameMarkup } from "/client/app/pages";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import { useTheme } from "./theme";
import { TI18NDoc } from "./types";
import Home from "./pages/Home";
import { challenges, gameservice } from "./Root";
import { OneChallengeButton } from "/lib/records/ChallengeButtonRecord";

const App = () => {
  const customTheme = useTheme();
  const [isGameServiceReady, setIsGameServiceReady] = useState(false);
  const [isChallengesReady, setIsChallengesReady] = useState(false);
  const [isChallengesButtonsReady, setIsChallengesButtonsReady] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isChallengesButtonsReady && isChallengesReady && isLoggedIn) {
      const challenge: OneChallengeButton = {
        name: "Challenge with me!",
        challenge: {
          rated: false,
          isolation_group: "public",
          clocks: {
            minutes: 15,
          },
          color: "w",
          opponentclocks: {
            minutes: 15,
          },
        },
      };

      const id = globalThis.icc.connection.user?.id || "";

      challenges.addChallenge({ minutes: 15 }, false, "w", [id], {
        minutes: 15,
      });
    }
  }, [isChallengesReady, isChallengesButtonsReady, isLoggedIn]);

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

    challenges.buttonEvents.on("ready", () => {
      // challenges.addChallenge()

      setIsChallengesButtonsReady(true);
    });
  }, []);

  const isAppReady =
    customTheme?.isReady &&
    isLoggedIn &&
    isGameServiceReady &&
    isChallengesReady &&
    isChallengesButtonsReady;

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
