import React, { FC } from "react";
import Close from "../../icons/Close";
import OpenChallengeItem from "../../OpenChallengeItem";
import Challenges from "../Challenges";
import TimeOptions from "../TimeOptions";
import { CommonGameSetup } from "../types";
import "./index.scss";
import { useTranslate } from "/client/app/hooks";
import { onPickTimeMock } from "../mocks";

type ChallengeLaunchedProps = CommonGameSetup;

const ChallengeLaunched: FC<ChallengeLaunchedProps> = ({ navigate }) => {
  const { t } = useTranslate();

  return (
    <div className="challengeLaunched">
      <OpenChallengeItem
        className="challengeLaunched__item"
        username=""
        gameTime={15}
        icon={<Close className="challengeLaunched__close" />}
      />
      <TimeOptions
        onPickTime={onPickTimeMock}
        subtitle={t("launchNewChallenge")}
      />
      <Challenges />
    </div>
  );
};

export default ChallengeLaunched;
