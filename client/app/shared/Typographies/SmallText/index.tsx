import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";
import "./index.scss";

interface ISmallTextProps extends HTMLAttributes<HTMLElement> {}

const SmallText: FC<ISmallTextProps> = ({ children, className }) => (
  <p className={clsx("smallText", className)}>{children}</p>
);

export default SmallText;
