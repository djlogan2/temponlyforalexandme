import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import i18next from "./i18next";
import { ComponentsView, GameAnalysis, GameMarkup } from "/client/app/pages";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import { useTheme } from "./theme";
import { TI18NDoc } from "./types";
import Home from "./pages/Home";
import { challenges, gameservice } from "./Root";

const App = () => {
  const customTheme = useTheme();
  const [isGameServiceReady, setIsGameServiceReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      console.log(challenges.getButtons());

      console.log("ready");
    });
    challenges.events.on("challengeadded", (id) => {
      console.log(`added=${id}`);
    });
  }, []);

  return customTheme?.isReady && isLoggedIn && isGameServiceReady ? (
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
