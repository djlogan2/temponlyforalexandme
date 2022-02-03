import React, { FCICC, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import { withDynamicStyles } from "./hocs/withDynamicStyles";
import useTranslate from "./hooks/useTranslate";
import { updateClasses } from "./store/features/theming";
import { useAppDispatch } from "./store/hooks";
import ComponentsView from "/client/app/ComponentsView";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import Clienti18n from "/lib/client/Clienti18n";
import ClientTheme from "/lib/client/ClientTheme";

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
        <Route path="/">
          <ComponentsView
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
