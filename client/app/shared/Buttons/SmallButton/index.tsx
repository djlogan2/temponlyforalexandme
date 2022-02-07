import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";

interface ISmallButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "red" | "dark";
}

const SmallButton: FC<ISmallButtonProps> = ({
  children,
  className,
  color = "dark",
  ...rest
}) => (
  <button
    type="button"
    {...rest}
    className={clsx(className, "smallButton", `smallButton--${color}`)}
  >
    {children}
  </button>
);

export default SmallButton;
