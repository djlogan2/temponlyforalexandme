import React, { FCICC } from "react";
import "./index.scss";

interface TitleProps {
  name: string;
  className?: string;
}

const Title: FCICC<TitleProps> = ({ name, token, ...rest }) => (
  <div id={name} className="title" {...rest}>
    {token.token}
  </div>
);

export default Title;
