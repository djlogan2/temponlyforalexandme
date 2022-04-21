import React from "react";
import { Redirect, Route, RouteProps, useParams } from "react-router";
import { gameservice } from "../../Root";

const GameGuard = (props: RouteProps) => {
  const { id } = useParams<{ id: string }>();

  // TODO. FIGURE OUT WHY IT DOESN"T WORK HERE

  const gameStatus = gameservice.getStatus(id);

  if (gameStatus === "analyzing") {
    return <Redirect to="/analysis" />;
  }

  return <Route {...props} />;
};

export default GameGuard;
