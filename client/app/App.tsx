import ComponentsView from "/client/app/ComponentsView";
import GameMarkup from "/client/app/GameMarkup";
import React, { FCICC, useEffect } from "react";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";
import Clienti18n from "/lib/client/Clienti18n";
import ClientTheme from "/lib/client/ClientTheme";
import { withTranslations } from "./hocs/withTranslations";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Theme, { ThemeContext } from './theme';

const subscriptionservice = new SubscriptionService(null);

const i18ndao = new Clienti18nReadOnlyDao(null, subscriptionservice);
const themedao = new ThemeReadOnlyDao(null, subscriptionservice);

const i18nClient = new Clienti18n(i18ndao);
const theme = new ClientTheme(themedao);

const App: FCICC = ({ classes, ...rest }) => {
  console.log('App startup');

  return (
    <ThemeContext.Provider value={theme as any}>
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
        </Switch>
      </Router>
    </ThemeContext.Provider>
  );
};

export default withTranslations(App);
