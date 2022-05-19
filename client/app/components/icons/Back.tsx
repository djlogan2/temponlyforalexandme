import React, { FC } from "react";

type BackProps = {
  width?: number;
  height?: number;
  className?: string;
};

export const Back: FC<BackProps> = ({ width = 22, height = 22, className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.55415 13.7528H9.18824V15.5014C9.18824 16.6933 7.70512 17.2414 6.93003 16.336L2.15502 10.7585C1.80249 10.3467 1.80249 9.73948 2.15502 9.32771L6.93003 3.75013C7.70512 2.84476 9.18824 3.3929 9.18824 4.58473V6.425L10.1031 6.51659C14.8677 6.90761 18.6997 10.304 19.8315 14.7668C20.1186 15.8988 18.9098 16.7176 17.97 16.1948L17.6965 16.0427C15.2263 14.6687 12.4817 13.8444 9.55415 13.7528ZM9.57139 12.6528L9.58858 12.6533C12.4264 12.7421 15.0971 13.4782 17.5235 14.7057C17.5849 14.7367 17.6462 14.7681 17.7073 14.7998C17.8832 14.8911 18.0579 14.985 18.2312 15.0814L18.5047 15.2335C18.6421 15.31 18.8039 15.1896 18.7653 15.0372C18.7496 14.9755 18.7334 14.9139 18.7166 14.8526C18.6779 14.7116 18.6363 14.5718 18.5917 14.4333C18.5625 14.3428 18.5321 14.2529 18.5005 14.1636C18.4726 14.0848 18.4437 14.0064 18.4139 13.9285C17.0886 10.4661 13.8928 7.93129 10.0131 7.61291L10.0033 7.6121L8.08824 7.42036V4.58473C8.08824 4.41447 7.87636 4.33616 7.76564 4.4655L2.99063 10.0431L7.76564 15.6207C7.87636 15.75 8.08824 15.6717 8.08824 15.5014V12.6528H9.57139Z"
      fill="white"
    />
  </svg>
);
