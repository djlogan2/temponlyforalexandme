import React, { FC } from "react";
import Close from "../../icons/Close";
import OpenChallengeItem from "../../OpenChallengeItem";
import Challenges from "../Challenges";
import TimeOptions from "../TimeOptions";
import { EComponents, ICommonGameSetup } from "../types";
import "./index.scss";

interface IChallengeLaunchedProps extends ICommonGameSetup {}

const ChallengeLaunched: FC<IChallengeLaunchedProps> = ({ navigate }) => (
  <div className="challengeLaunched">
    <OpenChallengeItem
      className="challengeLaunched__item"
      username=""
      gameTime={15}
      icon={<Close className="challengeLaunched__close" />}
    />
    <TimeOptions onPickTime={() => {}} subtitle="Launch a new challenge" />
    <Challenges />
  </div>
);

export default ChallengeLaunched;
