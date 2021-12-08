import * as React from "react";
import { Route, Redirect } from "react-router-dom";

interface NonAuthGuardRoutes {
  component: React.FunctionComponent;
  auth: boolean;
}

const NonAuthGuard = ({
  component: Component,
  auth,
  ...rest
}: NonAuthGuardRoutes) => (
  <Route
    {...rest}
    render={(props) => (!auth ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

export default NonAuthGuard;
