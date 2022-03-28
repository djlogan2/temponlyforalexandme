import { useTranslate } from "/client/app/hooks";
import React, { useState } from "react";
import Arrow from "../../icons/Arrow";
import LongArrow from "../../icons/LongArrow";
import Subtitle from "../../Subtitle";
import ChallengesList from "../ChallengesList";
import { challengeTypes } from "../constants";
import { TChallenge } from "../types";
import TabItemButton from "/client/app/shared/Buttons/TabItemButton";
import TextButton from "/client/app/shared/Buttons/TextButton";

const Challenges = () => {
  const [activeChallenge, setActiveChallenge] =
    useState<TChallenge>("challenge");
  const { t } = useTranslate();

  return (
    <div className="challenges">
      <Subtitle size="big" className="challenges__subtitle">
        {t("joinOpenChallenge")}
      </Subtitle>

      <div className="challenges__btns">
        {challengeTypes.map((type) => (
          <TabItemButton
            selected={activeChallenge === type}
            key={type}
            onClick={() => setActiveChallenge(type)}
            className="challenges__item"
          >
            {t(type)}
          </TabItemButton>
        ))}
      </div>

      <ChallengesList />
      <TextButton className="challenges__showMore">
        {t("showMore")}
        <LongArrow className="challenges__longArrowRight" />
        <Arrow className="challenges__arrowDown" />
      </TextButton>
    </div>
  );
};

export default Challenges;
