import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC } from "react";
import Heading5 from "../../Typographies/Heading5";
import "./index.scss";

interface IStandardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "big" | "small";
  color?: "white" | "blue";
}

const StandardButton: FC<IStandardButtonProps> = ({
  children,
  size = "big",
  color = "white",
  className,
  ...rest
}) => (
  <button
    type="button"
    className={clsx(
      "standardButton",
      `standardButton--${size}`,
      `standardButton--${color}`,
      className,
    )}
    {...rest}
  >
    <Heading5>{children}</Heading5>
  </button>
);

export default StandardButton;
