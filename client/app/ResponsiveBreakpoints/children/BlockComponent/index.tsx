import React, { FC } from "react";
import clsx from "clsx";
import "./index.scss";

interface IBlockComponent {
  className?: string;
}

const BlockComponent: FC<IBlockComponent> = ({ className, ...rest }) => {
  return <div className={clsx("block-component")} {...rest} />;
};

export default BlockComponent;
