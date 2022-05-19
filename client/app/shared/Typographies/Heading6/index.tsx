import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

type Heading6Props = {
  className?: string;
  children: React.ReactNode;
};

export const Heading6: FC<Heading6Props> = ({
  className,
  children,
  ...rest
}) => (
  <h6 className={clsx("heading6", className)} {...rest}>
    {children}
  </h6>
);
