import * as React from "react";
// @ts-ignore
import { Redirect, Route } from "react-router-dom";

interface AuthGuardProps {
  component: React.FunctionComponent,
  auth: boolean,
  roles: string[],
  currentRoles: string[],
}

const AuthGuard = ({
  component: Component,
  auth,
  roles,
  currentRoles,
  ...rest
}: AuthGuardProps) => {
  const suitableRoles = [];

  if (currentRoles.includes("developer")) {
    suitableRoles.push("developer");
  }

  if (roles && roles.length) {
    roles.forEach((role) => {
      if (currentRoles.includes(role)) suitableRoles.push(role);
    });
  }

  const canViewPage = auth && (!roles?.length || suitableRoles.length);

  return (
    <Route
      {...rest}
      // @ts-ignore
      render={(props) => {
        if (canViewPage) {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default AuthGuard;
