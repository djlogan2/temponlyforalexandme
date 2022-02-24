import clsx from "clsx";
import React, { useState } from "react";
import Backdrop from "../../shared/Backdrop";
import StandardButton from "../../shared/Buttons/StandardButton";
import TextButton from "../../shared/Buttons/TextButton";
import Arrow from "../icons/Arrow";
import LongArrow from "../icons/LongArrow";
import GameSetupChallenges from "./GameSetupChallenges";
import GameSetupChallengesList from "./GameSetupChallengesList";
import GameSetupControls from "./GameSetupControls";
import GameSetupPlayOptions from "./GameSetupPlayOptions";
import GameSetupTimeOptions from "./GameSetupTimeOptions";
import { TChallenge, TOptions, TTimeOption } from "./types";

const GameSetup = () => {
  const [gameOption, setGameOption] = useState<TOptions>("Anyone");
  const [timeOption, setTimeOption] = useState<TTimeOption>(15);
  const [activeChallenge, setActiveChallenge] =
    useState<TChallenge>("Challenge");
  const [showMoreChallengeTimes, setShowMoreChallengeTimes] = useState(false);

  return (
    <Backdrop>
      <div className="gameSetup">
        <GameSetupControls />
        <div className="gameSetup__container">
          <div className="gameSetup__title">Play</div>
          <GameSetupPlayOptions
            onClick={setGameOption}
            gameOption={gameOption}
          />
          <div className="gameSetup__subtitle">Launch a new challenge</div>
          <GameSetupTimeOptions
            onClick={setTimeOption}
            timeOption={timeOption}
            showMoreChallengeTimes={showMoreChallengeTimes}
          />
          <TextButton
            isFullWidth
            onClick={() => setShowMoreChallengeTimes((prev) => !prev)}
            className="gameSetup__showMore"
          >
            Show More
            <Arrow
              className={clsx(
                "gameSetup__arrowDown",
                showMoreChallengeTimes && "gameSetup__arrowUp",
              )}
            />
          </TextButton>
          <div className="gameSetup__subtitle">Join an Open challenge</div>
          <GameSetupChallenges
            activeChallenge={activeChallenge}
            onClick={setActiveChallenge}
          />

          <GameSetupChallengesList />

          <TextButton className="gameSetup__showMore">
            Show more
            <LongArrow className="gameSetup__longArrowRight" />
            <Arrow className="gameSetup__arrowDown" />
          </TextButton>

          <StandardButton className="gameSetup__customChallenge">
            Custom Challenge
          </StandardButton>
        </div>
      </div>
    </Backdrop>
  );
};

export default GameSetup;
