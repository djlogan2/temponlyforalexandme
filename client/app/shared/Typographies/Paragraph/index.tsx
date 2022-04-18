/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";
import { noop } from "lodash";
import React, { FC } from "react";
import "./index.scss";

interface ParagraphProps {
  className?: string;
  link?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Paragraph: FC<ParagraphProps> = ({
  children,
  link,
  className,
  onClick = noop,
  ...rest
}) =>
  link ? (
    <a
      className={clsx("paragraph paragraph--link", className)}
      href={link}
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <p className={clsx("paragraph", className)} onClick={onClick} {...rest}>
      {children}
    </p>
  );

export default Paragraph;
