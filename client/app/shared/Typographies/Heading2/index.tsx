import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

type Heading2Props = {
  className?: any;
  children: React.ReactNode;
};

export const Heading2: FC<Heading2Props> = ({
  className,
  children,
  ...rest
}) => (
  <h2 className={clsx("heading2", className)} {...rest}>
    {children}
  </h2>
);
