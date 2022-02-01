import React from "react";

interface IChessTitleProps {
  text: string;
}

const ChessTitle = ({ text }: IChessTitleProps) => (
  <svg
    width="36"
    height="17"
    viewBox="0 0 36 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 2C0 0.89543 0.895431 0 2 0H34C35.1046 0 36 0.895431 36 2V15C36 16.1046 35.1046 17 34 17H2C0.895431 17 0 16.1046 0 15V2Z"
      fill="url(#paint0_linear_494_85020)"
    />
    <text
      fill="#fff"
      y="75%"
      x="50%"
      fontSize="12"
      fontFamily="inherit"
      textAnchor="middle"
    >
      {text}
    </text>
    <defs>
      <linearGradient
        id="paint0_linear_494_85020"
        x1="34.9757"
        y1="0.939081"
        x2="21.7994"
        y2="27.85"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0842464" stopColor="#787878" />
        <stop offset="0.777009" stopColor="#282828" />
      </linearGradient>
    </defs>
  </svg>
);

export default ChessTitle;
