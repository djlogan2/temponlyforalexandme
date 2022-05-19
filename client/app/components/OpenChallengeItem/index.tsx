import React, { FC } from "react";

import clsx from "clsx";

import { UserStatus } from "/client/app/types";
import { useTranslate } from "/client/app/hooks";
import { Avatar } from "/client/app/shared/Avatar";
import { Flag, Flags } from "/client/app/shared/Flag";
import { Heading6 } from "/client/app/shared/Typographies/Heading6";
import { Paragraph } from "/client/app/shared/Typographies/Paragraph";

import { Bullet } from "../icons/Bullet";
import { ChessTitle } from "../icons/ChessTitle";

import "./index.scss";

type OpenChallengeItemProps = {
  username: string;
  gameTime: number;
  userStatus?: UserStatus;
  icon?: JSX.Element;
  flag?: Flags;
  chessTitle?: string;
  size?: "big" | "small";
  userPic?: string;
  userRating?: number;
  className?: string;
};

export const OpenChallengeItem: FC<OpenChallengeItemProps> = ({
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
}) => {
  const { t } = useTranslate();

  return (
    <div
      className={clsx("openChangeItem", `openChangeItem--${size}`, className)}
    >
      <Avatar
        status="offline"
        size="md"
        alt={t("gameIcon")}
        className="openChangeItem__challengePic"
      >
        <Bullet />
      </Avatar>
      <Heading6 className="openChangeItem__gameTime">
        {gameTime} {t("minutes")}
      </Heading6>
      {(userPic || userRating) && (
        <Heading6 className="openChangeItem__delimiter">|</Heading6>
      )}

      {userPic && (
        <Avatar
          picture={userPic}
          size="md"
          status={userStatus}
          alt={`${username}'s picture`}
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
};
