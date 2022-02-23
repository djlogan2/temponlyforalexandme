import React, { FC } from "react";

interface IArrowLeftProps {
  className?: string;
}

const ArrowLeft: FC<IArrowLeftProps> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21.7113 2.42258C22.1457 2.857 22.1457 3.55923 21.7113 3.99364L10.2749 15.4301L21.7113 26.8666C22.1457 27.301 22.1457 28.0032 21.7113 28.4376C21.2769 28.872 20.5747 28.872 20.1402 28.4376L7.91825 16.2156C7.70159 15.999 7.59268 15.7145 7.59268 15.4301C7.59268 15.1456 7.70159 14.8612 7.91825 14.6445L20.1402 2.42253C20.5747 1.98816 21.2769 1.98816 21.7113 2.42258Z" />
  </svg>
);

export default ArrowLeft;
