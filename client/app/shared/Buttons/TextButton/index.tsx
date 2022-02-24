import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";
import clsx from "clsx";
import Paragraph from "../../Typographies/Paragraph";

interface ITextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFullWidth?: boolean;
}

const TextButton: FC<ITextButtonProps> = ({
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

export default TextButton;
