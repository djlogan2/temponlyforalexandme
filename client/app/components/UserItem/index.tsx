import clsx from "clsx";
import Flags from "country-flag-icons/react/3x2";
import React, { FC } from "react";
import Avatar, { TUserStatus } from "../../shared/Avatar";
import ChessTitle from "../icons/ChessTitle";
import "./index.scss";

const { ...flags } = Flags;

type Flag = keyof typeof flags;

interface IUserItemProps {
  text: string;
  chessTitle: string;
  flag: Flag;
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
}) => {
  const FlagComponent = Flags[flag];

  return (
    <div className={clsx("userItem", `userItem--${size}`, className)}>
      <Avatar size={size} status={status} picture={picture} username={text} />
      <p className="userItem__username">{text}</p>

      <ChessTitle text={chessTitle} className="userItem__right" />
      <FlagComponent className="userItem__flag" />
    </div>
  );
};

export default UserItem;
