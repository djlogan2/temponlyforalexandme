import * as React from "react";
// @ts-ignore
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { noAuthRoutes, authRoutes } from "./routes";
import NonAuthGuard from "./guards/nonAuthGuard";
import AuthGuard from "./guards/authGuard";

const App = () => (
  <Router>
    <Switch>
      {noAuthRoutes.map((route) => (
        <NonAuthGuard key={route.path} component={route.component} auth={!!Meteor.userId()} {...route} />
      ))}
      {authRoutes.map((route) => (
        <AuthGuard
          roles={[]}
          key={route.path}
          component={route.component}
          auth={!!Meteor.userId()}
          {...route}
          currentRoles={[]}
        />
      ))}
    </Switch>
  </Router>
);

export default App;
