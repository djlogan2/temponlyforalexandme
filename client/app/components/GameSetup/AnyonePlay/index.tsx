import React, { FC, useState } from "react";
import Challenges from "../Challenges";
import Subtitle from "../Subtitle";
import TimeOptions from "../TimeOptions";
import { EComponents, TChallenge } from "../types";
import StandardButton from "/client/app/shared/Buttons/StandardButton";

interface IAnyonePlayProps {
  navigate: (component: EComponents) => void;
}

const AnyonePlay: FC<IAnyonePlayProps> = ({ navigate }) => (
  <div className="anyonePlay">
    <TimeOptions />
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
