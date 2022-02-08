import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

export type TUserStatus = "online" | "idle" | "unavailable" | "offline";

interface IAvatarProps {
  status: TUserStatus;
  size?: "bg" | "md" | "sm" | "xs";
  picture?: string;
  username: string;
  className?: string;
}

const Avatar: FC<IAvatarProps> = ({
  status,
  picture,
  username,
  className,
  size = "bg",
}) => (
  <div
    className={clsx(
      "avatarContainer",
      `avatarContainer--${status}`,
      `avatarContainer--${size}`,
      className,
    )}
  >
    {picture ? (
      <img
        className="avatarContainer__img"
        src={picture}
        alt={`${username}'s profile`}
      />
    ) : (
      <span className="avatarContainer__initials">
        {username.slice(0, 2).toUpperCase()}
      </span>
    )}
  </div>
);

export default Avatar;
