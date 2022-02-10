import React, { FC } from "react";
import "./index.scss";

interface Heading6Props {
  className?: string;
}

const Heading6: FC<Heading6Props> = ({ className, children, ...rest }) => (
  <h6 className="heading6" {...rest}>
    {children}
  </h6>
);

export default Heading6;
