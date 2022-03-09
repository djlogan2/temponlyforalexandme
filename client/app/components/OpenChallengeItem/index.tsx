import clsx from "clsx";
import React, { FC } from "react";
import Avatar from "../../shared/Avatar";
import Flag, { TFlags } from "../../shared/Flag";
import Heading6 from "../../shared/Typographies/Heading6";
import Paragraph from "../../shared/Typographies/Paragraph";
import { TUserStatus } from "../../types";
import Bullet from "../icons/Bullet";
import ChessTitle from "../icons/ChessTitle";
import "./index.scss";

interface IOpenChallengeItemProps {
  username: string;
  gameTime: number;
  userStatus?: TUserStatus;
  icon?: JSX.Element;
  flag?: TFlags;
  chessTitle?: string;
  size?: "big" | "small";
  userPic?: string;
  userRating?: number;
  className?: string;
}

const OpenChallengeItem: FC<IOpenChallengeItemProps> = ({
  chessTitle,
  icon,
  className,
  flag,
  gameTime,
  username,
  userRating,
  userPic,
  userStatus = "offline",
  size = "big",
}) => (
  <div className={clsx("openChangeItem", `openChangeItem--${size}`, className)}>
    <Avatar
      status="offline"
      size="md"
      alt="challenge game icon"
      className="openChangeItem__challengePic"
    >
      <Bullet />
    </Avatar>
    <Heading6 className="openChangeItem__gameTime">{gameTime} minutes</Heading6>
    {(userPic || userRating) && (
      <Heading6 className="openChangeItem__delimiter">|</Heading6>
    )}

    {userPic && (
      <Avatar
        picture={userPic}
        size="md"
        status={userStatus}
        alt={`${username}' picture`}
        className="openChangeItem__userPic"
      />
    )}
    {userRating && (
      <Paragraph className="openChangeItem__user">({userRating})</Paragraph>
    )}
    {chessTitle && (
      <ChessTitle text={chessTitle} className="openChangeItem__title" />
    )}
    {flag && <Flag flag={flag} />}
    {icon}
  </div>
);

export default OpenChallengeItem;
