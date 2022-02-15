import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

interface Heading5Props {
  className?: string;
  onClick?: () => void;
}

const Heading5: FC<Heading5Props> = ({ children, className, ...rest }) => (
  <h5 className={clsx("heading5", className)} {...rest}>
    {children}
  </h5>
);

export default Heading5;
