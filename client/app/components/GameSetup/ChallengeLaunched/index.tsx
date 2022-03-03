import React, { FC } from "react";
import Close from "../../icons/Close";
import OpenChallengeItem from "../../OpenChallengeItem";
import Challenges from "../Challenges";
import TimeOptions from "../TimeOptions";
import { EComponents } from "../types";
import "./index.scss";

interface IChallengeLaunchedProps {
  navigate: (option: EComponents) => void;
}

const ChallengeLaunched: FC<IChallengeLaunchedProps> = ({ navigate }) => (
  <div className="challengeLaunched">
    <OpenChallengeItem
      className="challengeLaunched__item"
      username=""
      gameTime={15}
      icon={<Close className="challengeLaunched__close" />}
    />
    <TimeOptions />
    <Challenges />
  </div>
);

export default ChallengeLaunched;
