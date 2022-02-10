import ComponentsView from "/client/app/ComponentsView";
import GameMarkup from "/client/app/GameMarkup";
import React, { FCICC } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import ResponsiveBreakpoints from "/client/app/ResponsiveBreakpoints";
import { useTheme } from "/client/app/theme";

const App: FCICC = ({ classes, ...rest }) => {
  const theme = useTheme();
  const isSubsReady = true; // useAllServicesReady();

  return theme?.isReady ? (
    <Router>
      <Switch>
        <Route exact path="/">
          <ComponentsView
            keyboardFunctions={[]}
            token={{
              token: "",
              args: [],
            }}
            classes={[]}
          />
        </Route>
        <Route exact path="/game">
          <GameMarkup
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
