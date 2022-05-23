import React, { FC } from "react";

import { useTranslate } from "/client/app/hooks";
import StandardButton from "/client/app/shared/Buttons/StandardButton";

import { Components, CommonGameSetup } from "../types";
import { onPickTimeMock } from "../mocks";
import Challenges from "../Challenges";
import TimeOptions from "../TimeOptions";

type AnyonePlayProps = CommonGameSetup;

const AnyonePlay: FC<AnyonePlayProps> = ({ navigate }) => {
  const { t } = useTranslate();

  return (
    <div className="anyonePlay">
      <TimeOptions
        onPickTime={onPickTimeMock}
        subtitle={t("launchNewChallenge")}
      />
      <Challenges />
      <StandardButton
        className="anyonePlay__customChallenge"
        onClick={() => navigate(Components.CUSTOM)}
      >
        {t("customChallenge")}
      </StandardButton>
    </div>
  );
};

export default AnyonePlay;
