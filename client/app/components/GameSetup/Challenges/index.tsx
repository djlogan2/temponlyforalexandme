import React, { useState } from "react";

import { useTranslate } from "/client/app/hooks";
import { TabItemButton } from "/client/app/shared/Buttons/TabItemButton";
import { TextButton } from "/client/app/shared/Buttons/TextButton";

import { Arrow } from "../../icons/Arrow";
import { LongArrow } from "../../icons/LongArrow";
import { Subtitle } from "../../Subtitle";
import { Challenge } from "../types";
import { challengeTypes } from "../constants";
import { ChallengesList } from "../ChallengesList";

export const Challenges = () => {
  const [activeChallenge, setActiveChallenge] =
    useState<Challenge>("challenge");
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
