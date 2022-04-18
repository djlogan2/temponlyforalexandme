import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

interface Heading4Props {
  className?: string;
  children: React.ReactNode;
}

const Heading4: FC<Heading4Props> = ({ className, children, ...rest }) => (
  <h4 className={clsx("heading4", className)} {...rest}>
    {children}
  </h4>
);

export default Heading4;
