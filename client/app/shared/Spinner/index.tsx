import React, { FC } from "react";
import clsx from "clsx";

type SpinnerProps = {
  className?: string;
};

export const Spinner: FC<SpinnerProps> = ({ className }) => (
  <div className={clsx("Spinner", className)}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
