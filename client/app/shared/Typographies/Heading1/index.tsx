import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

type Heading1Props = {
  className?: string;
  children: React.ReactNode;
};

export const Heading1: FC<Heading1Props> = ({
  className,
  children,
  ...rest
}) => (
  <h1 className={clsx("heading1", className)} {...rest}>
    {children}
  </h1>
);
