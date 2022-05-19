import clsx from "clsx";
import FlagIcons from "country-flag-icons/react/3x2";
import React, { FC } from "react";
import "./index.scss";

const { ...flags } = FlagIcons;

export type Flags = keyof typeof flags;

interface FlagProps {
  flag: Flags;
  className?: string;
}

export const Flag: FC<FlagProps> = ({ flag, className }) => {
  const FlagComponent = FlagIcons[flag];

  return <FlagComponent className={clsx("flag", className)} />;
};
