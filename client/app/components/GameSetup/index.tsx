import clsx from "clsx";
import React, { useState } from "react";
import Backdrop from "../../shared/Backdrop";
import StandardButton from "../../shared/Buttons/StandardButton";
import TabButton from "../../shared/Buttons/TabButton";
import TabButtonSquared from "../../shared/Buttons/TabButtonSquared";
import Heading5 from "../../shared/Typographies/Heading5";
import Paragraph from "../../shared/Typographies/Paragraph";
import Arrow from "../icons/Arrow";
import Close from "../icons/Close";
import LongArrow from "../icons/LongArrow";
import More from "../icons/More";
import OpenChallengeItem from "../OpenChallengeItem";
import { challengeTypes, options, timeOptions } from "./constants";

const GameSetup = () => {
  const [gameOption, setGameOption] =
    useState<typeof options[number]>("Anyone");
  const [timeOption, setTimeOption] = useState<typeof timeOptions[number]>(15);
  const [activeChallenge, setActiveChallenge] =
    useState<typeof challengeTypes[number]>("Challenge");

  const [showMoreChallengeTimes, setShowMoreChallengeTimes] = useState(false);

  return (
    <Backdrop>
      <div className="gameSetup">
        <div className="gameSetup__actions">
          <Arrow className="gameSetup__pointer gameSetup__arrowLeft" />
          <Close className="gameSetup__pointer" />
        </div>
        <div className="gameSetup__container">
          <div className="gameSetup__title">Play</div>
          <div className="gameSetup__options">
            {options.map((tab) => (
              <TabButton
                isColorless={gameOption !== tab}
                key={tab}
                onClick={() => setGameOption(tab)}
                color={gameOption === tab ? "primary" : undefined}
              >
                {tab}
              </TabButton>
            ))}
          </div>
          <div className="gameSetup__subtitle">Launch a new challenge</div>
          <div
            className={clsx(
              "gameSetup__timeOptions",
              showMoreChallengeTimes && "gameSetup__timeOptions--seenAll",
            )}
          >
            {timeOptions.map((time) => (
              <TabButtonSquared
                color={timeOption === time ? "primary" : undefined}
                key={time}
                onClick={() => setTimeOption(time)}
                iconTop={time === "custom" ? <More /> : undefined}
              >
                <p>{time}</p>
                {time !== "custom" && <p>minute</p>}
              </TabButtonSquared>
            ))}
          </div>
          <Paragraph
            className="gameSetup__showMore"
            onClick={() => setShowMoreChallengeTimes((prev) => !prev)}
          >
            Show more{" "}
            <Arrow
              className={clsx(
                "gameSetup__arrowDown",
                showMoreChallengeTimes && "gameSetup__arrowUp",
              )}
            />
          </Paragraph>
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
            <OpenChallengeItem
              key={i}
              size="small"
              className="gameSetup__challenge-item"
              flag="IT"
              chessTitle="WGM"
              gameTime={15}
              userRating={1600}
              username="Test"
              userPic="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              userStatus="online"
            />
          ))}

          <Paragraph className="gameSetup__showMore">
            Show more
            <LongArrow className="gameSetup__longArrowRight" />
            <Arrow className="gameSetup__arrowDown" />
          </Paragraph>

          <StandardButton className="gameSetup__customChallenge">
            Custom Challenge
          </StandardButton>
        </div>
      </div>
    </Backdrop>
  );
};

export default GameSetup;
