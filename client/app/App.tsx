import ComponentsView from "/client/app/ComponentsView";
import GameMarkup from "/client/app/GameMarkup";
import GameAnalysis from "/client/app/pages/GameAnalysis";
import React, { FCICC } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import ResponsiveBreakpoints from "/client/app/ResponsiveBreakpoints";
import { useTheme } from "./theme";

const App: FCICC = ({ classes, ...rest }) => {
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
