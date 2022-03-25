import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ComponentsView from "./pages/ComponentsView";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import { useTheme } from "./theme";
import GameAnalysis from "/client/app/pages/GameAnalysis";
import GameMarkup from "/client/app/pages/GameMarkup";
import ResponsiveBreakpoints from "/client/app/ResponsiveBreakpoints";

const App = () => {
  const customTheme = useTheme();

  useEffect(() => {
    i18n.events.on("translation", (translation) => {
      console.log(translation);
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
