import React, { FC } from "react";
import clsx from "clsx";

interface ISpinner {
  className?: string;
}

const Spinner: FC<ISpinner> = ({ className }) => (
  <div className={clsx("Spinner", className)}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Spinner;
