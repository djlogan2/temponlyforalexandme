import { debounce } from "lodash";
import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import GameGuard from "./guards/GameGuard";
import i18next from "./i18next";
import Home from "./pages/Home";
import { challenges, gameservice } from "./Root";
import { useTheme } from "./theme";
import { TI18NDoc } from "./types";
import { ComponentsView, GameAnalysis, GameMarkup } from "/client/app/pages";

const App = () => {
  const customTheme = useTheme();
  const history = useHistory();

  useEffect(() => {
    const translations = new Map();

    const debounced = debounce((locale) => {
      const resources = Object.fromEntries(translations);

      i18next.addResources(locale, "translation", resources);

      translations.clear();
    }, 500);

    i18n.events.on("translationchanged", (translation: TI18NDoc) => {
      if (!translation) {
        return;
      }

      const { locale, token, text } = translation;

      translations.set(token, text);

      return debounced(locale);
    });

    challenges.events.on("challengeadded", console.log);
  }, []);

  useEffect(() => {
    gameservice.getStatus("trxwpaChkjxZtn7FH");

    gameservice.events.on("started", (id) => {
      // IT WORKS HERE
      const gameStatus = gameservice.getStatus(id);
      if (gameStatus === "computer") {
        history.push(`/game/${id}`);
      }
    });
  }, [history]);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <GameGuard exact path="/game/:id" component={GameMarkup} />
      <Route exact path="/analysis">
        <GameAnalysis />
      </Route>
      <Route exact path="/ui-elements">
        <ComponentsView />
      </Route>
    </Switch>
  );
};

export default App;
