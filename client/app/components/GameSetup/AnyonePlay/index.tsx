import React, { FC } from "react";
import Challenges from "../Challenges";
import TimeOptions from "../TimeOptions";
import { EComponents, ICommonGameSetup } from "../types";
import StandardButton from "/client/app/shared/Buttons/StandardButton";

interface IAnyonePlayProps extends ICommonGameSetup {}

const AnyonePlay: FC<IAnyonePlayProps> = ({ navigate }) => (
  <div className="anyonePlay">
    <TimeOptions onPickTime={() => {}} subtitle="Launch a new challenge" />
    <Challenges />
    <StandardButton
      className="anyonePlay__customChallenge"
      onClick={() => navigate(EComponents.CUSTOM)}
    >
      Custom Challenge
    </StandardButton>
  </div>
);

export default AnyonePlay;
