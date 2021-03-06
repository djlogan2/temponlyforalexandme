import React, { FC } from "react";

interface IAbortProps {
  width?: number;
  height?: number;
  className?: string;
}

const Abort: FC<IAbortProps> = ({ width = 23, height = 23, className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.6614 11.077C19.6614 15.8181 15.818 19.6616 11.0768 19.6616C9.06028 19.6616 7.20613 18.9663 5.74103 17.8023L17.4035 5.27444C18.8056 6.80238 19.6614 8.83973 19.6614 11.077ZM4.86308 17.0002L16.5411 4.45568C15.0567 3.22921 13.1528 2.49234 11.0768 2.49234C6.33568 2.49234 2.49221 6.3358 2.49221 11.077C2.49221 13.3737 3.39412 15.4597 4.86308 17.0002ZM20.7691 11.077C20.7691 16.4299 16.4297 20.7693 11.0768 20.7693C5.72392 20.7693 1.38452 16.4299 1.38452 11.077C1.38452 5.72404 5.72392 1.38464 11.0768 1.38464C16.4297 1.38464 20.7691 5.72404 20.7691 11.077Z"
      fill="white"
    />
  </svg>
);

export default Abort;
