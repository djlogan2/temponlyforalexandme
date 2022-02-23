import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";

interface IPieceButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "big" | "small";
}

const PieceButton: FC<IPieceButtonProps> = ({
  children,
  className,
  size = "big",
  ...rest
}) => (
  <button
    type="button"
    {...rest}
    className={clsx(className, "pieceButton", `pieceButton--${size}`)}
  >
    {children}
  </button>
);

export default PieceButton;
