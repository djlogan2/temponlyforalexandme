import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";
import "./index.scss";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {}

const Card: FC<ICardProps> = ({ children, className, ...rest }) => (
  <div className={clsx("card", className)} {...rest}>
    {children}
  </div>
);

export default Card;
