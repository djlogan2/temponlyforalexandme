import clsx from "clsx";
import React, { FC } from "react";
import { challengeTypes } from "../constants";
import { TChallenge } from "../types";
import Heading5 from "/client/app/shared/Typographies/Heading5";

interface IGameSetupChallengesProps {
  activeChallenge: TChallenge;
  onClick: (activeChallenge: TChallenge) => void;
}

const GameSetupChallenges: FC<IGameSetupChallengesProps> = ({
  activeChallenge,
  onClick,
}) => (
  <div className="gameSetupChallenges">
    {challengeTypes.map((type) => (
      <Heading5
        key={type}
        onClick={() => onClick(type)}
        className={clsx(
          "gameSetupChallenges__item",
          type === activeChallenge && "gameSetupChallenges__item--active",
        )}
      >
        {type}
      </Heading5>
    ))}
  </div>
);

export default GameSetupChallenges;
