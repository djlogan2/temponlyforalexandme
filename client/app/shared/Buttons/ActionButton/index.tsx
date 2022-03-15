import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  hoverText?: string;
  onButtonClick?: () => void;
  size?: "small" | "medium" | "big";
  color?: "danger" | "dark" | "secondary" | "primary";
}

const ActionButton: FC<ActionButtonProps> = ({
  name,
  className,
  onButtonClick,
  hoverText,
  children,
  color = "dark",
  size = "medium",
  ...rest
}) => (
  <button
    data-hover={hoverText}
    onClick={onButtonClick}
    className={clsx(
      "activeButton",
      `activeButton--${color}`,
      `activeButton--${size}`,
      className,
    )}
    type="button"
    {...rest}
  >
    {children}
  </button>
);

export default ActionButton;
