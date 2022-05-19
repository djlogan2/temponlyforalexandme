import React, { FC } from "react";
import { OpenChallengeItem } from "../../OpenChallengeItem";
import "./index.scss";

type ChallengesListProps = {};

export const ChallengesList: FC<ChallengesListProps> = () => (
  <div className="challengesList">
    {new Array(4).fill(0).map((_, i) => (
      <OpenChallengeItem
        key={i}
        size="small"
        className="challengesList__item"
        flag="IT"
        chessTitle="WGM"
        gameTime={15}
        userRating={1600}
        username="Test"
        userPic="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        userStatus="online"
      />
    ))}
  </div>
);
