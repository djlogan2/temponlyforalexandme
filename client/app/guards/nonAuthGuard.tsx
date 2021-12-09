import * as React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

interface NonAuthGuardRoutes {
  component: React.FunctionComponent<RouteComponentProps>;
  auth: boolean;
}

const NonAuthGuard = ({
  component: Component,
  auth,
  ...rest
}: NonAuthGuardRoutes) => (
  <Route
    {...rest}
    render={(props) => {
      return !auth ? <Component {...props} /> : <Redirect to="/" />;
    }}
  />
);

export default NonAuthGuard;
