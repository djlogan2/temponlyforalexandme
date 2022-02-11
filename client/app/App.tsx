import ComponentsView from "/client/app/ComponentsView";
import GameMarkup from "/client/app/GameMarkup";
import React, { FCICC } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LoadingPlaceholder from "./shared/LoadingPlaceholder";
import ResponsiveBreakpoints from "/client/app/ResponsiveBreakpoints";

// const userdao = new CommonReadOnlyUserDao(null);
// const clientserver = new ClientServer(userdao);
//
// const subscriptionservice = new SubscriptionService(null);
//
// const i18ndao = new Clienti18nReadOnlyDao(null, subscriptionservice);
// const themedao = new ThemeReadOnlyDao(null, subscriptionservice);
//
// const i18nClient = new Clienti18n(i18ndao);
// const clienttheme = new ClientTheme(null, themedao);
//
// const gamedao = new ClientGameReadOnlyDao(null, subscriptionservice);
// const gameservice = new GameService(null, gamedao, clientserver.connection);
//
// function loggedin() {
//   clientserver.connection.events.off("loggedin", loggedin);
// }
//
// //
// // TODO: This is a stupid example with a hard coded computer game.
// //   This ALL needs to come out and be better architected!
// //
// new Promise<void>((resolve) => {
//   if (clientserver.connection.user) {
//     resolve();
//     return;
//   }
//   clientserver.connection.events.on("loggedin", () => {
//     loggedin();
//     resolve();
//   });
// }).then(() => {
//   const computerchallenge: ComputerChallengeRecord = {
//     _id: "x",
//     type: "computer",
//     skill_level: 1,
//     clock: { minutes: 15 },
//   };
//
//   gameservice.events.on("started", () => {
//     console.log("The computer game has started");
//   });
//
//   gameservice.startComputerGame(computerchallenge);
// });

const App: FCICC = ({ classes, ...rest }) => {
  // const theme = useTheme(); It seems "theme" is a global variable, so yea, seems like a bug waiting to happen?
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
