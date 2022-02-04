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
import { withDynamicStyles } from "./hocs/withDynamicStyles";
import { useAppDispatch } from "./store/hooks";
import { updateClasses } from "./store/features/theming";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

const subscriptionservice = new SubscriptionService(null);

const i18ndao = new Clienti18nReadOnlyDao(null, subscriptionservice);
const themedao = new ThemeReadOnlyDao(null, subscriptionservice);

const i18nClient = new Clienti18n(i18ndao);
const theme = new ClientTheme(themedao);

const App: FCICC = ({ classes, ...rest }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(classes).length) {
      dispatch(updateClasses(classes as any));
    }
  }, [classes]);

  return (
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
  );
};

export default withDynamicStyles(App);
