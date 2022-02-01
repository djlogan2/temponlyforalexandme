import React from "react";

interface ILagProps {
  lagLevel: 1 | 2 | 3 | 4 | 5;
}

const rects = [0, 3.5, 7, 10.5, 14];

const Lag = ({ lagLevel }: ILagProps) => {
  let color = "";

  if (lagLevel === 1) {
    color = "#FF0000";
  } else {
    color = "#55586A";
  }

  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {rects.map((xCoordinate, i) => (
        <rect
          key={xCoordinate}
          x={xCoordinate}
          width="2"
          height="17"
          rx="0.5"
          fill={`${lagLevel < i + 1 ? "#9698A2" : color}`}
        />
      ))}
    </svg>
  );
};

export default Lag;
