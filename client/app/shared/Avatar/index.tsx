import clsx from "clsx";
import React, { FC } from "react";
import { TUserStatus } from "../../types";
import "./index.scss";

interface IAvatarProps {
  alt: string;
  size?: "bg" | "md" | "sm" | "xs";
  status?: TUserStatus;
  picture?: string;
  className?: string;
  children?: React.ReactNode;
}

const Avatar: FC<IAvatarProps> = ({
  picture,
  className,
  alt,
  children,
  status = "offline",
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
  </div>
);

export default Avatar;
