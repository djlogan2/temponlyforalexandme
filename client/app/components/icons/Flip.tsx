import clsx from "clsx";
import React, { FC } from "react";

interface IFlipProps {
  onClick: () => void;
  className?: string;
}

const Flip: FC<IFlipProps> = ({ onClick, className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    className={clsx(className)}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 6H9V9H6V6ZM12 9H9L9 12H6V15H9V18H12V15H15V18H18V15H15V12H18V9H15V6H12V9ZM12 12H15V9H12V12ZM12 12V15H9V12H12Z"
      fill="#9698A2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.72636 16.6666H4L2 20.6666L0 16.6666H1.33332L1.33332 5.65574C1.33332 4.18902 2.53614 3 4.01989 3L7.99999 3V4.37705L4.01989 4.37705C3.30549 4.37705 2.72636 4.94954 2.72636 5.65574V16.6666Z"
      fill="#9698A2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.2736 7.33336L20 7.33336L22 3.33336L24 7.33336L22.6667 7.33336L22.6667 18.3443C22.6667 19.811 21.4639 21 19.9801 21L16 21L16 19.623L19.9801 19.6229C20.6945 19.6229 21.2736 19.0505 21.2736 18.3443L21.2736 7.33336Z"
      fill="#9698A2"
    />
  </svg>
);

export default Flip;
