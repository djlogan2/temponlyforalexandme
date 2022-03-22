import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ComponentsView from "./pages/ComponentsView";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import { useTheme } from "./theme";
import GameMarkup from "/client/app/pages/GameMarkup";
import GameAnalysis from "/client/app/pages/GameAnalysis";
import ResponsiveBreakpoints from "/client/app/ResponsiveBreakpoints";

const App = () => {
  const customTheme = useTheme();

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
          <ComponentsView
            keyboardFunctions={[]}
            token={{
              token: "",
              args: [],
            }}
            classes={[]}
          />
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
