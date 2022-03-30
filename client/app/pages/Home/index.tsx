import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GameSetup } from "../../components";
import { gameservice } from "../../Root";

const Home = () => {
  const [showGameSetup, setShowGameSetup] = useState(false);
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

  return (
    <>
      <button type="button" onClick={() => setShowGameSetup(true)}>
        Start a game
      </button>
      {showGameSetup && (
        <GameSetup onCloseModal={() => setShowGameSetup(false)} />
      )}
    </>
  );
};

export default Home;
