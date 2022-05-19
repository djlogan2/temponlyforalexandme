import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

type Heading3Props = {
  className?: string;
  children: React.ReactNode;
};

export const Heading3: FC<Heading3Props> = ({
  className,
  children,
  ...rest
}) => (
  <h3 className={clsx("heading3", className)} {...rest}>
    {children}
  </h3>
);
