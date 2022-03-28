import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import i18next from "./i18next";
import { ComponentsView, GameAnalysis, GameMarkup } from "/client/app/pages";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import { useTheme } from "./theme";
import { TI18NDoc } from "./types";

const App = () => {
  const customTheme = useTheme();

  useEffect(() => {
    i18n.events.on("translationchanged", (translation: TI18NDoc) => {
      if (!translation) {
        return;
      }

      const { locale, token, text } = translation;

      i18next.addResource(locale, "translation", token, text);
    });
  }, []);

  return customTheme?.isReady ? (
    <Router>
      <Switch>
        <Route exact path="/">
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
