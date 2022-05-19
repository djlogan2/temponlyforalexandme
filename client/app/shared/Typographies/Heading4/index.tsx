import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

type Heading4Props = {
  className?: string;
  children: React.ReactNode;
};

export const Heading4: FC<Heading4Props> = ({
  className,
  children,
  ...rest
}) => (
  <h4 className={clsx("heading4", className)} {...rest}>
    {children}
  </h4>
);
