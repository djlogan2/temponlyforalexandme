import React, { FC } from "react";
import clsx from "clsx";
import "./index.scss";

interface ITextComponent {
  className?: string;
}

const TextComponent: FC<ITextComponent> = ({ className, ...rest }) => {
  return <div className={clsx("text-component", className)} {...rest} />;
};

export default TextComponent;
