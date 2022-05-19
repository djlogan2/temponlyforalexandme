import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";
import "./index.scss";

interface SmallTextProps extends HTMLAttributes<HTMLElement> {}

export const SmallText: FC<SmallTextProps> = ({ children, className }) => (
  <p className={clsx("smallText", className)}>{children}</p>
);
