import clsx from "clsx";
import React, { FC } from "react";
import Avatar from "../../shared/Avatar";
import Flag, { TFlags } from "../../shared/Flag";
import { TUserStatus } from "../../types";
import ChessTitle from "../icons/ChessTitle";
import "./index.scss";

interface IUserItemProps {
  text: string;
  chessTitle: string;
  flag: TFlags;
  status?: TUserStatus;
  picture?: string;
  size?: "md" | "sm";
  className?: string;
}

const UserItem: FC<IUserItemProps> = ({
  text,
  picture,
  chessTitle,
  flag,
  className,
  status = "offline",
  size = "md",
}) => (
  <div className={clsx("userItem", `userItem--${size}`, className)}>
    <Avatar
      size={size}
      status={status}
      picture={picture}
      username={text}
      alt={`${text}'s profile`}
    />
    <p className="userItem__username">{text}</p>

    <ChessTitle text={chessTitle} className="userItem__right" />
    <Flag className="userItem__flag" flag={flag} />
  </div>
);

export default UserItem;
