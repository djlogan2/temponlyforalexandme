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
  size?: "big" | "small";
  chessTitle: string;
  flag: TFlags;
  username: string;
  userRating: number;
  gameTime: number;
  userStatus: TUserStatus;
  userPic?: string;
  className?: string;
}

const OpenChallengeItem: FC<IOpenChallengeItemProps> = ({
  chessTitle,
  className,
  flag,
  gameTime,
  username,
  userRating,
  userPic,
  userStatus,
  size = "big",
}) => (
  <div className={clsx("openChangeItem", `openChangeItem--${size}`, className)}>
    <Avatar
      status="offline"
      size="md"
      username=""
      alt="challenge game icon"
      className="openChangeItem__challengePic"
    >
      <Bullet />
    </Avatar>
    <Heading6 className="openChangeItem__gameTime">{gameTime} minutes</Heading6>
    <Heading6 className="openChangeItem__delimiter">|</Heading6>

    {userPic && (
      <Avatar
        picture={userPic}
        size="md"
        status={userStatus}
        alt={`${username}' picture`}
        className="openChangeItem__userPic"
      />
    )}
    <Paragraph className="openChangeItem__user">({userRating})</Paragraph>
    <ChessTitle text={chessTitle} className="openChangeItem__title" />
    <Flag flag={flag} />
  </div>
);

export default OpenChallengeItem;
