import clsx from "clsx";
import React, { FC, useEffect } from "react";
import "./index.scss";

type BackdropProps = {
  pRelative?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Backdrop: FC<BackdropProps> = ({
  children,
  pRelative,
  className,
}) => {
  useEffect(() => {
    document.body.classList.add("hide-scroll");

    return () => document.body.classList.remove("hide-scroll");
  }, []);

  return (
    <div
      className={clsx(
        "backdrop",
        `backdrop--${pRelative ? "relative" : "fixed"}`,
        className,
      )}
    >
      {children}
    </div>
  );
};
