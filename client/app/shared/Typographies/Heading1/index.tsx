import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

interface Heading1Props {
  className?: string;
  children: React.ReactNode;
}

const Heading1: FC<Heading1Props> = ({ className, children, ...rest }) => (
  <h1 className={clsx("heading1", className)} {...rest}>
    {children}
  </h1>
);

export default Heading1;
