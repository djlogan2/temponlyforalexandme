import React, { FC } from "react";

interface IMoreProps {
  className?: string;
}

const More: FC<IMoreProps> = ({ className }) => (
  <svg
    className={className}
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.89023 14.3999C1.56475 14.3999 0.490234 13.3254 0.490234 11.9999C0.490234 10.6744 1.56475 9.59989 2.89023 9.59989C4.21571 9.59989 5.29023 10.6744 5.29023 11.9999C5.29023 13.3254 4.21571 14.3999 2.89023 14.3999ZM12.4902 14.3999C11.1647 14.3999 10.0902 13.3254 10.0902 11.9999C10.0902 10.6744 11.1647 9.5999 12.4902 9.5999C13.8156 9.5999 14.8902 10.6744 14.8902 11.9999C14.8902 13.3254 13.8156 14.3999 12.4902 14.3999ZM19.6902 11.9999C19.6902 13.3254 20.7647 14.3999 22.0902 14.3999C23.4157 14.3999 24.4902 13.3254 24.4902 11.9999C24.4902 10.6744 23.4157 9.5999 22.0902 9.5999C20.7647 9.5999 19.6902 10.6744 19.6902 11.9999Z"
      fill="#131314"
    />
  </svg>
);

export default More;