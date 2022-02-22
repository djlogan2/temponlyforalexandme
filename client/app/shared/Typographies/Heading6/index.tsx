import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

interface Heading6Props {
  className?: string;
}

const Heading6: FC<Heading6Props> = ({ className, children, ...rest }) => (
  <h6 className={clsx("heading6", className)} {...rest}>
    {children}
  </h6>
);

export default Heading6;
