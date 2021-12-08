import { Meteor } from "meteor/meteor";
import { i18n } from "meteor/universe:i18n";
import * as React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import I18N from "../../imports/client/clientI18n";
import useEventEmitter from "../data/hooks/useEventEmitter";
import { EEmitterEvents } from "../data/hooks/useEventEmitter/events";
import AuthGuard from "./guards/authGuard";
import NonAuthGuard from "./guards/nonAuthGuard";
import { authRoutes, noAuthRoutes } from "./routes";

const App = () => {
  const [isLocaleSetup, setIsLocaleSetup] = React.useState(false);

  useEventEmitter({
    event: EEmitterEvents.I18N_CHANGE,
    tracker: I18N.subscribe,
    shouldTrackerUnmount: true,
  });

  React.useEffect(() => {
    i18n.onceChangeLocale(() => {
      setIsLocaleSetup(true);
    });
  }, []);

  const userId = Meteor.userId();

  return (
    isLocaleSetup && (
      <Router>
        <Switch>
          {noAuthRoutes.map((route) => (
            <NonAuthGuard key={route.path} auth={!!userId} {...route} />
          ))}
          {authRoutes.map((route) => (
            <AuthGuard
              roles={[]}
              key={route.path}
              auth={!!userId}
              {...route}
              currentRoles={[]}
            />
          ))}
        </Switch>
      </Router>
    )
  );
};

export default App;
