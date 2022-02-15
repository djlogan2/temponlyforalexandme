import React, { FC, useEffect } from "react";
import "./index.scss";

interface IBackdropProps {}

const Backdrop: FC<IBackdropProps> = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("hide-scroll");

    return () => document.body.classList.remove("hide-scroll");
  }, []);

  return <div className="backdrop">{children}</div>;
};

export default Backdrop;
