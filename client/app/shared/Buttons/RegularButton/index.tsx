import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";

interface IRegularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "blue" | "dark";
}

export const RegularButton: FC<IRegularButtonProps> = ({
  children,
  className,
  color = "blue",
  ...rest
}) => (
  <button
    type="button"
    {...rest}
    className={clsx(className, "regularButton", `regularButton--${color}`)}
  >
    {children}
  </button>
);
