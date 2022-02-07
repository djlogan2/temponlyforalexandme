import React, { FC } from "react";
import "./index.scss";

interface Heading5Props {
  className?: string;
}

const Heading5: FC<Heading5Props> = ({ children, ...rest }) => (
  <h5 className="heading5" {...rest}>
    {children}
  </h5>
);

export default Heading5;
