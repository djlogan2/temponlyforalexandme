import React, { FCICC } from "react";
import "./index.scss";

type TitleProps = {
  name: string;
  className?: string;
};

export const Title: FCICC<TitleProps> = ({ name, token, ...rest }) => (
  <div id={name} className="title" {...rest}>
    {token.token}
  </div>
);
