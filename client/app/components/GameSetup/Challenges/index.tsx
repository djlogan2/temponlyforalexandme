import React, { FC } from "react";
import { challengeTypes } from "../constants";
import { TChallenge } from "../types";
import TabItemButton from "/client/app/shared/Buttons/TabItemButton";

interface IChallengesProps {
  activeChallenge: TChallenge;
  onClick: (activeChallenge: TChallenge) => void;
}

const Challenges: FC<IChallengesProps> = ({ activeChallenge, onClick }) => (
  <div className="challenges">
    {challengeTypes.map((type) => (
      <TabItemButton
        selected={activeChallenge === type}
        key={type}
        onClick={() => onClick(type)}
        className="challenges__item"
      >
        {type}
      </TabItemButton>
    ))}
  </div>
);

export default Challenges;
