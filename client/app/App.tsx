import React, { useEffect } from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import { debounce } from "lodash";

import { useServices } from "./contexts/services";
import GameGuard from "./guards/GameGuard";
import Home from "./pages/Home";
import { useTheme } from "./contexts/theme";
import i18next from "./i18next";
import { I18NDoc } from "./types";
import { ComponentsView, GameAnalysis, GameMarkup } from "./pages";

const App = () => {
  const { challengeService, gameService } = useServices();
  const customTheme = useTheme();
  const history = useHistory();

  useEffect(() => {
    const translations = new Map();

    const debounced = debounce((locale) => {
      const resources = Object.fromEntries(translations);

      i18next.addResources(locale, "translation", resources);

      translations.clear();
    }, 500);

    i18n.events.on("translationchanged", (translation: I18NDoc) => {
      if (!translation) {
        return;
      }

      const { locale, token, text } = translation;

      translations.set(token, text);

      return debounced(locale);
    });

    challengeService.events.on("challengeadded", console.log);
  }, []);

  useEffect(() => {
    gameService.getStatus("trxwpaChkjxZtn7FH");

    gameService.events.on("started", (id) => {
      // IT WORKS HERE
      const gameStatus = gameService.getStatus(id);

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
      <GameGuard
        exact
        path="/game/:id"
        component={GameMarkup}
        gameService={gameService}
      />
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
