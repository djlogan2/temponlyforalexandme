import ComponentsView from "/client/app/ComponentsView";
import GameMarkup from "/client/app/GameMarkup";
import React, { FCICC } from "react";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";
import Clienti18n from "/lib/client/Clienti18n";
import ClientTheme from "/lib/client/ClientTheme";
import { withTranslations } from "./hocs/withTranslations";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Theme, { ThemeProvider } from "./theme";
import GameService from "/imports/client/service/GameService";
import Spinner from "./shared/Spinner";
import { GameReadOnlyDao } from "/imports/client/dao/GameReadOnlyDao";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import ClientServer from "/lib/client/ClientServer";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";
import ResponsiveBreakpoints from "/client/app/ResponsiveBreakpoints";

const userdao = new CommonReadOnlyUserDao(null);
const clientserver = new ClientServer(userdao);

const subscriptionservice = new SubscriptionService(null);

const i18ndao = new Clienti18nReadOnlyDao(null, subscriptionservice);
const themedao = new ThemeReadOnlyDao(null, subscriptionservice);

const i18nClient = new Clienti18n(i18ndao);
const theme = new ClientTheme(null, themedao);

const commongamedao = new CommonReadOnlyGameDao(null);
const gamedao = new GameReadOnlyDao(null, subscriptionservice, commongamedao);
const gameservice = new GameService(null, gamedao);

function loggedin() {
  clientserver.connection.events.off("loggedin", loggedin);
}

//
// TODO: This is a stupid example with a hard coded computer game.
//   This ALL needs to come out and be better architected!
//
new Promise<void>((resolve) => {
  if (clientserver.connection.user) {
    resolve();
    return;
  }
  clientserver.connection.events.on("loggedin", () => {
    loggedin();
    resolve();
  });
}).then(() => {
  const computerchallenge: ComputerChallengeRecord = {
    _id: "x",
    type: "computer",
    skill_level: 1,
    clock: { minutes: 15 },
  };

  gameservice.events.on("started", () => {
    console.log("The computer game has started");
  });

  gameservice.startComputerGame(computerchallenge);
});

const App: FCICC = ({ classes, ...rest }) => {
  const isSubsReady = true; // useAllServicesReady();

  return isSubsReady ? (
    <ThemeProvider themeService={theme}>
      <Theme />
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
    </ThemeProvider>
  ) : (
    <Spinner />
  );
};

export default withTranslations(App);
