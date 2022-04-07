import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import { challenges, gameservice } from "./Root";
import { ComponentsView, GameAnalysis, GameMarkup } from "/client/app/pages";

const App = () => {
  const history = useHistory();

  useEffect(() => {
    const onStartedHandler = (id: string) => {
      history.push(`/game/${id}`);
    };

    gameservice.events.on("started", onStartedHandler);

    return () => {
      gameservice.events.off("started", onStartedHandler);
    };
  }, []);

  useEffect(() => {
    // const id = globalThis.icc.connection.user?.id || "";
    // challenges.addChallenge({ minutes: 15 }, false, "w", [id], {
    //   minutes: 15,
    // });

    challenges.events.on("challengeadded", console.log);
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/game/:id">
        <GameMarkup />
      </Route>
      <Route exact path="/analysis">
        <GameAnalysis />
      </Route>
      <Route exact path="/ui-elements">
        <ComponentsView />
      </Route>
    </Switch>
  );
};

export default App;
