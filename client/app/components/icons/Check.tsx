import React, { HTMLAttributes } from "react";

interface ICheckProps extends HTMLAttributes<SVGElement> {}

const Check = (props: ICheckProps) => (
  <svg
    width="12"
    height="9"
    viewBox="0 0 12 9"
    fill="current"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9.07959 0.658622C9.58663 0.100867 10.4498 0.059762 11.0076 0.566813C11.5653 1.07386 11.6064 1.93706 11.0994 2.49481L5.86625 8.25127C5.61518 8.52745 5.26195 8.68876 4.88882 8.69764C4.51568 8.70652 4.15518 8.56219 3.89125 8.29827L0.944676 5.35169C0.41167 4.81869 0.41167 3.95451 0.944676 3.42151C1.47768 2.8885 2.34186 2.8885 2.87486 3.42151L4.26949 4.81613C4.56337 5.11001 5.04325 5.09859 5.32282 4.79107L9.07959 0.658622Z" />
  </svg>
);

export default Check;
