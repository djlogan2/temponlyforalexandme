import React from "react";
import { Redirect, Route, RouteProps, useParams } from "react-router";
import GameService from "/imports/client/service/GameService";

type Props = RouteProps & { gameService: GameService };

const GameGuard = ({ gameService, ...props }: Props) => {
  const { id } = useParams<{ id: string }>();

  // TODO. FIGURE OUT WHY IT DOESN"T WORK HERE

  const gameStatus = gameService.getStatus(id);

  if (gameStatus === "analyzing") {
    return <Redirect to="/analysis" />;
  }

  return <Route {...props} />;
};

export default GameGuard;
