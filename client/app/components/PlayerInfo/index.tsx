import clsx from "clsx";
import React, { FC } from "react";
import Avatar, { TUserStatus } from "../../shared/Avatar";
import ChatIcon from "../icons/Chat";
import ChessTitle from "../icons/ChessTitle";
import France from "../icons/France";
import LagIcon from "../icons/Lag";
import WebcamIcon from "../icons/Webcam";
import "./index.scss";

interface IPlayerInfoProps {
  picture: string;
  username: string;
  rank: number;
  title: string;
  userStatus: TUserStatus;
  lagLevel: 1 | 2 | 3 | 4 | 5;
  flip?: boolean;
  className?: string;
}

const PlayerInfo: FC<IPlayerInfoProps> = ({
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
      username={username}
      className="playerInfo__avatar"
      status={userStatus}
      size="bg"
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

export default PlayerInfo;
