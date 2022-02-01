import clsx from "clsx";
import React, { FCICC } from "react";
import { useAppSelector } from "../../store/hooks";
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
}) => {
  const classes = useAppSelector(({ theming }) => theming.classes);

  return (
    <div
      className={clsx(
        classes.playerInfoContainer,
        flip && classes.playerInfoContainerFlipped,
      )}
    >
      <div
        className={clsx(
          classes.playerInfoImgContainer,
          userStatus === "online" && classes.playerInfoImgContainerOnline,
          userStatus === "idle" &&
            classes.playerInfoImgContainerIdle &&
            classes.playerInfoImgContainerIdle,
          userStatus === "unavailable" &&
            classes.playerInfoImgContainerUnavailable &&
            classes.playerInfoImgContainerUnavailable,
          userStatus === "offline" &&
            classes.playerInfoImgContainerOffline &&
            classes.playerInfoImgContainerOffline,
        )}
      >
        <img
          className={classes.playerInfoImg}
          src={picture}
          alt={`${username}'s profile`}
        />
      </div>
      <div className={classes.playerInfoIcons}>
        <ChatIcon />
        <WebcamIcon />
        <LagIcon lagLevel={lagLevel} />
        <ChessTitle text={title} />
        <France />
      </div>

      <p className={classes.playerInfoUsername}>
        {username} <span>({rank})</span>
      </p>
    </div>
  );
};

export default PlayerInfo;
