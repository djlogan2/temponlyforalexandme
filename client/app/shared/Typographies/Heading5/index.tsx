import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

type Heading5Props = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const Heading5: FC<Heading5Props> = ({
  children,
  className,
  ...rest
}) => (
  <h5 className={clsx("heading5", className)} {...rest}>
    {children}
  </h5>
);
