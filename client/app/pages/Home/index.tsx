import React, { useState } from "react";
import { GameSetup } from "../../components";
import { challenges } from "../../Root";

const Home = () => {
  const [showGameSetup, setShowGameSetup] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          challenges.addChallenge({ minutes: 15 }, true);
        }}
      >
        Start a game
      </button>
      {showGameSetup && (
        <GameSetup onCloseModal={() => setShowGameSetup(false)} />
      )}
    </>
  );
};

export default Home;
