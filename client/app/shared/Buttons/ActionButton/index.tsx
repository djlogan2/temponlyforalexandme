import clsx from "clsx";
import React, { ButtonHTMLAttributes, FCICC } from "react";
import "./index.scss";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  className?: string;
  hoverText?: string;
  onButtonClick?: () => void;
  size?: "small" | "medium" | "big";
  color?: "red" | "dark" | "grey";
}

const ActionButton: FCICC<ActionButtonProps> = ({
  name,
  className,
  onButtonClick,
  hoverText,
  token,
  children,
  color = "dark",
  size = "medium",
  ...rest
}) => (
  <button
    data-hover={hoverText}
    name={name}
    onClick={onButtonClick}
    className={clsx(
      "activeButton",
      `activeButton--${color}`,
      `activeButton--${size}`,
    )}
    type="button"
    {...rest}
  >
    {children}
  </button>
);

export default ActionButton;
