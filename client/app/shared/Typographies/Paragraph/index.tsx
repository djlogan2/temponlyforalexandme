import clsx from "clsx";
import React, { FC } from "react";
import "./index.scss";

interface ParagraphProps {
  className?: string;
  link?: string;
}

const Paragraph: FC<ParagraphProps> = ({
  children,
  link,
  className,
  ...rest
}) =>
  link ? (
    <a className={clsx("paragraph paragraph--link", className)} href={link}>
      {children}
    </a>
  ) : (
    <p className={clsx("paragraph", className)} {...rest}>
      {children}
    </p>
  );

export default Paragraph;
