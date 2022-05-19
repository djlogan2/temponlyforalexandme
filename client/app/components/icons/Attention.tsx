import React, { FC } from "react";

type AttentionProps = {
  color: string;
};

export const Attention: FC<AttentionProps> = ({ color }) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 8.5C15 12.366 11.866 15.5 8 15.5C4.13401 15.5 1 12.366 1 8.5C1 4.63401 4.13401 1.5 8 1.5C11.866 1.5 15 4.63401 15 8.5ZM7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12ZM7 8.44441C7 8.9967 7.44772 9.44441 8 9.44441C8.55229 9.44441 9 8.9967 9 8.44441V4.99997C9 4.44768 8.55228 3.99997 8 3.99997C7.44772 3.99997 7 4.44768 7 4.99997V8.44441Z"
      fill={color}
    />
  </svg>
);
