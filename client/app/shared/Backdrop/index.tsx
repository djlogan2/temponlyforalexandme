import clsx from "clsx";
import React, { FC, useEffect } from "react";
import "./index.scss";

interface IBackdropProps {
  pRelative?: boolean;
  className?: string;
}

const Backdrop: FC<IBackdropProps> = ({ children, pRelative, className }) => {
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

export default Backdrop;
