import React, { FC } from "react";
import clsx from "clsx";
import Spinner from "../Spinner";

interface ISpinner {
  className?: string;
}

const LoadingPlaceholder: FC<ISpinner> = ({ className }) => (
  <div className={clsx("LoadingPlaceholder", className)}>
    <Spinner />
  </div>
);

export default LoadingPlaceholder;
