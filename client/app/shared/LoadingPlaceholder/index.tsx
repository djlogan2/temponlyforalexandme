import React, { FC } from "react";
import clsx from "clsx";
import { Spinner } from "../Spinner";

type LoadingPlaceholderProps = {
  className?: string;
};

export const LoadingPlaceholder: FC<LoadingPlaceholderProps> = ({
  className,
}) => (
  <div className={clsx("LoadingPlaceholder", className)}>
    <Spinner />
  </div>
);
