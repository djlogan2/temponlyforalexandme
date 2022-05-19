import React, { useState } from "react";
import { GameSetup } from "../../components";

export const Home = () => {
  const [showGameSetup, setShowGameSetup] = useState(false);

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
