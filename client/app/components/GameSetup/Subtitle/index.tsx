import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";
import "./index.scss";

interface ISubtitleProps extends HTMLAttributes<HTMLElement> {
  size?: "small" | "big";
}

const Subtitle: FC<ISubtitleProps> = ({
  className,
  children,
  size = "small",
}) => (
  <p className={clsx("subtitle", `subtitle--${size}`, className)}>{children}</p>
);

export default Subtitle;
