import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";
import clsx from "clsx";
import { Paragraph } from "../../Typographies/Paragraph";

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFullWidth?: boolean;
}

export const TextButton: FC<TextButtonProps> = ({
  children,
  className,
  isFullWidth,
  ...rest
}) => (
  <button
    type="button"
    className={clsx("textButton", isFullWidth && `textButton--full`, className)}
    {...rest}
  >
    <Paragraph className="textButton__text">{children}</Paragraph>
  </button>
);
