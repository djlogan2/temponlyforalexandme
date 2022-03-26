import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import i18next from "./i18next";
import ComponentsView from "./pages/ComponentsView";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import { useTheme } from "./theme";
import { TI18NDoc } from "./types";
import GameAnalysis from "/client/app/pages/GameAnalysis";
import GameMarkup from "/client/app/pages/GameMarkup";
import ResponsiveBreakpoints from "/client/app/ResponsiveBreakpoints";

const App = () => {
  const customTheme = useTheme();

  useEffect(() => {
    i18n.events.on("ready", () => {
      i18n.events.on(
        "translationchanged",
        ({ locale, token, text, ...rest }: TI18NDoc) => {
          i18next.addResource(locale, "translation", token, text);
        },
      );
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
        <Route exact path="/responsive-breakpoints">
          <ResponsiveBreakpoints />
        </Route>
      </Switch>
    </Router>
  ) : (
    <LoadingPlaceholder />
  );
};

export default App;
