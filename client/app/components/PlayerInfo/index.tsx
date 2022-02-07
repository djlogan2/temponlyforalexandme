import clsx from "clsx";
import React, { FCICC } from "react";
import "./index.scss";
import ChatIcon from "../icons/Chat";
import ChessTitle from "../icons/ChessTitle";
import France from "../icons/France";
import LagIcon from "../icons/Lag";
import WebcamIcon from "../icons/Webcam";

interface IPlayerInfoProps {
  picture: string;
  username: string;
  rank: number;
  title: string;
  userStatus: "online" | "idle" | "unavailable" | "offline";
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
  <div
    className={clsx(
      "playerInfoContainer",
      flip && "playerInfoContainerFlipped",
    )}
  >
    <div
      className={clsx(
        "playerInfoImgContainer",
        userStatus === "online" && "playerInfoImgContainerOnline",
        userStatus === "idle" &&
          "playerInfoImgContainerIdle" &&
          "playerInfoImgContainerIdle",
        userStatus === "unavailable" &&
          "playerInfoImgContainerUnavailable" &&
          "playerInfoImgContainerUnavailable",
        userStatus === "offline" &&
          "playerInfoImgContainerOffline" &&
          "playerInfoImgContainerOffline",
      )}
    >
      <img
        className="playerInfoImg"
        src={picture}
        alt={`${username}'s profile`}
      />
    </div>
    <div className="playerInfoIcons">
      <ChatIcon />
      <WebcamIcon />
      <LagIcon lagLevel={lagLevel} />
      <ChessTitle text={title} />
      <France />
    </div>

    <p className="playerInfoUsername">
      {username} <span>({rank})</span>
    </p>
  </div>
);

export default PlayerInfo;
