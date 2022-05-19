import React from "react";

import { Redirect, Route, RouteProps, useParams } from "react-router";

import GameService from "/imports/client/service/GameService";

type GameGuardProps = RouteProps & { gameService: GameService };

export const GameGuard = ({ gameService, ...props }: GameGuardProps) => {
  const { id } = useParams<{ id: string }>();

  // TODO. FIGURE OUT WHY IT DOESN"T WORK HERE

  const gameStatus = gameService.getStatus(id);

  if (gameStatus === "analyzing") {
    return <Redirect to="/analysis" />;
  }

  return <Route {...props} />;
};
