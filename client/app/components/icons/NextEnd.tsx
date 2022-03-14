import React, { HTMLAttributes } from "react";

interface INextEndProps extends HTMLAttributes<SVGElement> {}

const NextEnd = (props: INextEndProps) => (
  <svg
    width="17"
    height="18"
    viewBox="0 0 17 18"
    fill="current"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6802 17.25C14.4357 17.25 14.2375 17.0401 14.2375 16.7812L14.2375 1.48661C14.2375 1.22772 14.4357 1.01786 14.6802 1.01786C14.9247 1.01786 15.1229 1.22772 15.1229 1.48661L15.1229 16.7813C15.1229 17.0401 14.9247 17.25 14.6802 17.25Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.65623 2.42156V15.5783L12.8228 8.99994L2.65623 2.42156ZM1.77081 2.08724C1.77081 1.50154 2.37651 1.14186 2.84851 1.44728L13.5318 8.35998C13.9837 8.65243 13.9837 9.34746 13.5318 9.63991L2.84851 16.5526C2.37651 16.858 1.77081 16.4983 1.77081 15.9127V2.08724Z"
    />
  </svg>
);

export default NextEnd;
