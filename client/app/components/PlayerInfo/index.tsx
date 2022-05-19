import React, { FC } from "react";

import clsx from "clsx";

import { Avatar } from "/client/app/shared/Avatar";

import { UserStatus } from "../../types";
import { Chat as ChatIcon } from "../icons/Chat";
import { ChessTitle } from "../icons/ChessTitle";
import { France } from "../icons/France";
import { Lag as LagIcon } from "../icons/Lag";
import { Webcam as WebcamIcon } from "../icons/Webcam";

import "./index.scss";

type PlayerInfoProps = {
  picture?: string;
  username: string;
  rank: number;
  title: string;
  userStatus: UserStatus;
  lagLevel: 1 | 2 | 3 | 4 | 5;
  flip?: boolean;
  className?: string;
};

export const PlayerInfo: FC<PlayerInfoProps> = ({
  picture,
  username,
  rank,
  title,
  lagLevel,
  flip,
  userStatus,
  className,
}) => (
  <div className={clsx("playerInfo", flip && "playerInfo--flipped", className)}>
    <Avatar
      picture={picture}
      className="playerInfo__avatar"
      status={userStatus}
      size="bg"
      alt={`${username}'s profile`}
    />

    <div className="playerInfo__icons">
      <ChatIcon />
      <WebcamIcon />
      <LagIcon lagLevel={lagLevel} />
      <ChessTitle text={title} />
      <France />
    </div>

    <p className="playerInfo__username">
      {username} <span>({rank})</span>
    </p>
  </div>
);
