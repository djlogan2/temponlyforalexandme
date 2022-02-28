import clsx from "clsx";
import React, { useState } from "react";
import Backdrop from "../../shared/Backdrop";
import StandardButton from "../../shared/Buttons/StandardButton";
import TextButton from "../../shared/Buttons/TextButton";
import ScrollBar from "../../shared/ScrollBar";
import Arrow from "../icons/Arrow";
import LongArrow from "../icons/LongArrow";
import Challenges from "./Challenges";
import ChallengesList from "./ChallengesList";
import Controls from "./Controls";
import CustomChallenge from "./CustomChallenge";
import PlayOptions from "./PlayOptions";
import TimeOptions from "./TimeOptions";
import { TChallenge, TOptions, TTimeOption } from "./types";

const GameSetup = () => {
  const [gameOption, setGameOption] = useState<TOptions>("Anyone");
  const [timeOption, setTimeOption] = useState<TTimeOption>(15);
  const [activeChallenge, setActiveChallenge] =
    useState<TChallenge>("Challenge");
  const [showMoreChallengeTimes, setShowMoreChallengeTimes] = useState(false);
  const [customChallenge, setCustomChallenge] = useState(false);

  return (
    <Backdrop>
      <div className="gameSetup">
        <ScrollBar
          autoHeight={false}
          height={768}
          style={{
            backgroundColor: "var(--colorOneThree)",
          }}
        >
          <div className="gameSetup__scrollContainer">
            <Controls />
            <div className="gameSetup__container">
              <div className="gameSetup__title">
                {customChallenge ? "Custom Challenge" : "Play"}
              </div>
              <PlayOptions onClick={setGameOption} gameOption={gameOption} />

              {customChallenge ? (
                <CustomChallenge />
              ) : (
                <>
                  <div className="gameSetup__subtitle">
                    Launch a new challenge
                  </div>
                  <TimeOptions
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
                  <div className="gameSetup__subtitle">
                    Join an Open challenge
                  </div>
                  <Challenges
                    activeChallenge={activeChallenge}
                    onClick={setActiveChallenge}
                  />
                  <ChallengesList />
                  <TextButton className="gameSetup__showMore">
                    Show more
                    <LongArrow className="gameSetup__longArrowRight" />
                    <Arrow className="gameSetup__arrowDown" />
                  </TextButton>
                  <StandardButton
                    className="gameSetup__customChallenge"
                    onClick={() => setCustomChallenge(true)}
                  >
                    Custom Challenge
                  </StandardButton>
                </>
              )}
            </div>
          </div>
        </ScrollBar>
      </div>
    </Backdrop>
  );
};

export default GameSetup;
