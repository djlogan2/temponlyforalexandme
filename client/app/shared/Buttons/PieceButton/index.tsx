import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";

interface IPieceButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "big" | "small";
  color?: "dark" | "regular";
}

export const PieceButton: FC<IPieceButtonProps> = ({
  children,
  className,
  size = "big",
  color = "regular",
  ...rest
}) => (
  <button
    type="button"
    {...rest}
    className={clsx(
      "pieceButton",
      `pieceButton--${size}`,
      `pieceButton--${color}`,
      className,
    )}
  >
    {children}
  </button>
);
