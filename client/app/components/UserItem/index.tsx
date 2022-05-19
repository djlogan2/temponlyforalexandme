/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC } from "react";

import clsx from "clsx";
import { noop } from "lodash";

import { Avatar } from "/client/app/shared/Avatar";
import { Flag, Flags } from "/client/app/shared/Flag";
import { UserStatus } from "client/app/types";

import { ChessTitle } from "../icons/ChessTitle";

import "./index.scss";

type UserItemProps = {
  text: string;
  chessTitle: string;
  flag: Flags;
  onClick?: () => void;
  status?: UserStatus;
  picture?: string;
  size?: "md" | "sm";
  className?: string;
};

export const UserItem: FC<UserItemProps> = ({
  text,
  picture,
  chessTitle,
  flag,
  className,
  onClick = noop,
  status = "offline",
  size = "md",
}) => (
  <div
    className={clsx("userItem", `userItem--${size}`, className)}
    onClick={onClick}
  >
    <Avatar
      size={size}
      status={status}
      picture={picture}
      alt={`${text}'s profile`}
    />
    <p className="userItem__username">{text}</p>

    <ChessTitle text={chessTitle} className="userItem__right" />
    <Flag className="userItem__flag" flag={flag} />
  </div>
);
