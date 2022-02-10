import React, { FC } from "react";
import clsx from "clsx";

interface IContentComponent {
  className?: string;
}

const ContentComponent: FC<IContentComponent> = ({ className, ...rest }) => {
  return <div className={clsx("content-component", className)} {...rest} />;
};

export default ContentComponent;
