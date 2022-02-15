import clsx from "clsx";
import React, { useState } from "react";
import Backdrop from "../../shared/Backdrop";
import StandardButton from "../../shared/Buttons/StandardButton";
import TabButton from "../../shared/Buttons/TabButton";
import Heading5 from "../../shared/Typographies/Heading5";
import ArrowLeft from "../icons/ArrowLeft";
import Close from "../icons/Close";
import More from "../icons/More";
import UserItem from "../UserItem";
import { options, timeOptions, challengeTypes } from "./constants";

const GameSetup = () => {
  const [gameOption, setGameOption] =
    useState<typeof options[number]>("Anyone");

  const [timeOption, setTimeOption] = useState<typeof timeOptions[number]>(15);

  const [activeChallenge, setActiveChallenge] =
    useState<typeof challengeTypes[number]>("Challenge");

  return (
    <Backdrop>
      <div className="gameSetup">
        <div className="gameSetup__actions">
          <ArrowLeft className="gameSetup__pointer" />
          <Close className="gameSetup__pointer" />
        </div>
        <div className="gameSetup__container">
          <div className="gameSetup__title">Play</div>
          <div className="gameSetup__options">
            {options.map((tab) => (
              <TabButton
                key={tab}
                onClick={() => setGameOption(tab)}
                color={gameOption === tab ? "primary" : undefined}
              >
                {tab}
              </TabButton>
            ))}
          </div>
          <div className="gameSetup__subtitle">Launch a new challenge</div>
          <div className="gameSetup__timeOptions">
            {timeOptions.map((time) => (
              <TabButton
                key={time}
                className={clsx(
                  "gameSetup__challengeTime",
                  time === timeOption && "gameSetup__challengeTime--active",
                )}
                onClick={() => setTimeOption(time)}
              >
                {time !== "custom" ? (
                  <>
                    <p>{time}</p>
                    <p>minute</p>
                  </>
                ) : (
                  <>
                    <More
                      className={clsx(
                        time === timeOption && "gameSetup__more--active",
                      )}
                    />
                    <p>{time}</p>
                  </>
                )}
              </TabButton>
            ))}
          </div>
          <div className="gameSetup__subtitle">Join an Open challenge</div>
          <div className="gameSetup__challenge-types">
            {challengeTypes.map((type) => (
              <Heading5
                key={type}
                onClick={() => setActiveChallenge(type)}
                className={clsx(
                  "gameSetup__challenge-type",
                  type === activeChallenge &&
                    "gameSetup__challenge-type--active",
                )}
              >
                {type}
              </Heading5>
            ))}
          </div>
          {new Array(4).fill(0).map((_, i) => (
            <UserItem
              className="gameSetup__challenge-item"
              key={i}
              text="User name (1600)"
              chessTitle="WGM"
              status="online"
              flag="IT"
              size="sm"
            />
          ))}

          <p className="gameSetup__show-more">Show more</p>

          <StandardButton className="gameSetup__btn-more">
            More Options
          </StandardButton>
        </div>
      </div>
    </Backdrop>
  );
};

export default GameSetup;
