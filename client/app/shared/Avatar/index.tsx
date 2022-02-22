import clsx from "clsx";
import React, { FC } from "react";
import { TUserStatus } from "../../types";
import "./index.scss";

interface IAvatarProps {
  status: TUserStatus;
  alt: string;
  size?: "bg" | "md" | "sm" | "xs";
  picture?: string;
  username?: string;
  className?: string;
}

const Avatar: FC<IAvatarProps> = ({
  status,
  picture,
  username,
  className,
  alt,
  children,
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
    {children}
    {picture && (
      <img className="avatarContainer__img" src={picture} alt={alt} />
    )}
    {username && (
      <span className="avatarContainer__initials">
        {username.slice(0, 2).toUpperCase()}
      </span>
    )}
  </div>
);

export default Avatar;
