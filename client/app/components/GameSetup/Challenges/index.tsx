import React, { FC, useState } from "react";
import Arrow from "../../icons/Arrow";
import LongArrow from "../../icons/LongArrow";
import ChallengesList from "../ChallengesList";
import { challengeTypes } from "../constants";
import Subtitle from "../../Subtitle";
import { TChallenge } from "../types";
import TabItemButton from "/client/app/shared/Buttons/TabItemButton";
import TextButton from "/client/app/shared/Buttons/TextButton";

interface IChallengesProps {}

const Challenges: FC<IChallengesProps> = () => {
  const [activeChallenge, setActiveChallenge] =
    useState<TChallenge>("Challenge");

  return (
    <div className="challenges">
      <Subtitle size="big" className="challenges__subtitle">
        Join an Open challenge
      </Subtitle>

      <div className="challenges__btns">
        {challengeTypes.map((type) => (
          <TabItemButton
            selected={activeChallenge === type}
            key={type}
            onClick={() => setActiveChallenge(type)}
            className="challenges__item"
          >
            {type}
          </TabItemButton>
        ))}
      </div>

      <ChallengesList />
      <TextButton className="challenges__showMore">
        Show more
        <LongArrow className="challenges__longArrowRight" />
        <Arrow className="challenges__arrowDown" />
      </TextButton>
    </div>
  );
};

export default Challenges;
