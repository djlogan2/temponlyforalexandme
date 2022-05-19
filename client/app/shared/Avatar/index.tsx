import React, { FC } from "react";

import clsx from "clsx";

import { UserStatus } from "client/app/types";

import "./index.scss";

type AvatarProps = {
  alt: string;
  size?: "bg" | "md" | "sm" | "xs";
  status?: UserStatus;
  picture?: string;
  className?: string;
  children?: React.ReactNode;
};

export const Avatar: FC<AvatarProps> = ({
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
