import React, { FC } from "react";
import Challenges from "../Challenges";
import TimeOptions from "../TimeOptions";
import { EComponents, ICommonGameSetup } from "../types";
import { useTranslate } from "/client/app/hooks";
import StandardButton from "/client/app/shared/Buttons/StandardButton";

interface IAnyonePlayProps extends ICommonGameSetup {}

const AnyonePlay: FC<IAnyonePlayProps> = ({ navigate }) => {
  const { t } = useTranslate();

  return (
    <div className="anyonePlay">
      <TimeOptions onPickTime={() => {}} subtitle={t("launchNewChallenge")} />
      <Challenges />
      <StandardButton
        className="anyonePlay__customChallenge"
        onClick={() => navigate(EComponents.CUSTOM)}
      >
        {t("customChallenge")}
      </StandardButton>
    </div>
  );
};

export default AnyonePlay;
