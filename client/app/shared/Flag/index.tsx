import clsx from "clsx";
import Flags from "country-flag-icons/react/3x2";
import React, { FC } from "react";
import "./index.scss";

const { ...flags } = Flags;

export type TFlags = keyof typeof flags;

interface IFlagProps {
  flag: TFlags;
  className?: string;
}

const Flag: FC<IFlagProps> = ({ flag, className }) => {
  const FlagComponent = Flags[flag];

  return <FlagComponent className={clsx("flag", className)} />;
};

export default Flag;
