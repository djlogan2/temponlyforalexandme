import { debounce } from "lodash";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import i18next from "./i18next";
import Home from "./pages/Home";
import { challenges } from "./Root";
import { useTheme } from "./theme";
import { TI18NDoc } from "./types";
import { ComponentsView, GameAnalysis, GameMarkup } from "/client/app/pages";

const App = () => {
  const customTheme = useTheme();

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

  return (
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
  );
};

export default App;
