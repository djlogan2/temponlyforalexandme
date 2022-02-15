import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";
import clsx from "clsx";

interface ITabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary";
}

const TabButton: FC<ITabButtonProps> = ({
  children,
  className,
  color,
  ...rest
}) => (
  <button
    type="button"
    className={clsx("tabButton", color && `tabButton--${color}`, className)}
    {...rest}
  >
    {children}
  </button>
);

export default TabButton;
