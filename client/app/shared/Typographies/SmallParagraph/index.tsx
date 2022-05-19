import React, { FC } from "react";
import "./index.scss";

type SmallParagraphProps = {
  className?: string;
  link?: string;
  children: React.ReactNode;
};

export const SmallParagraph: FC<SmallParagraphProps> = ({
  link,
  children,
  ...rest
}) =>
  link ? (
    <a className="smallParagraphLink" href={link}>
      {children}
    </a>
  ) : (
    <div className="smallParagraph" {...rest}>
      {children}
    </div>
  );
