import React, { FC } from "react";

interface ICloseProps {
  className?: string;
}

const Close: FC<ICloseProps> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.73414 3.99996C5.13985 3.6575 5.88639 3.82605 6.40159 4.37643L27.0016 26.3833C27.5168 26.9337 27.6055 27.6575 27.1998 28C26.7941 28.3424 26.0476 28.1739 25.5324 27.6235L4.93237 5.61657C4.41718 5.0662 4.32843 4.34241 4.73414 3.99996Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.2659 3.99996C26.8601 3.6575 26.1136 3.82605 25.5984 4.37643L4.99842 26.3833C4.48323 26.9337 4.39448 27.6575 4.80019 28C5.2059 28.3424 5.95244 28.1739 6.46763 27.6235L27.0676 5.61657C27.5828 5.0662 27.6716 4.34241 27.2659 3.99996Z"
    />
  </svg>
);

export default Close;
