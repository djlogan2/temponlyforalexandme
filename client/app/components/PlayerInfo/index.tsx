import clsx from "clsx";
import React, { FCICC } from "react";
import "./index.scss";
import ChatIcon from "../icons/Chat";
import ChessTitle from "../icons/ChessTitle";
import France from "../icons/France";
import LagIcon from "../icons/Lag";
import WebcamIcon from "../icons/Webcam";
import Avatar, { TUserStatus } from "../../shared/Avatar";

interface IPlayerInfoProps {
  picture: string;
  username: string;
  rank: number;
  title: string;
  userStatus: TUserStatus;
  lagLevel: 1 | 2 | 3 | 4 | 5;
  flip?: boolean;
}

const PlayerInfo: FCICC<IPlayerInfoProps> = ({
  picture,
  username,
  rank,
  title,
  lagLevel,
  flip,
  userStatus,
}) => (
  <div className={clsx("playerInfo", flip && "playerInfo--flipped")}>
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
