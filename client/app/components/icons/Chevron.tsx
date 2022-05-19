import React, { HTMLAttributes } from "react";

interface IChevronProps extends HTMLAttributes<SVGElement> {}

export const Chevron = (props: IChevronProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="current"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13.8534 5.13534C13.6579 4.95489 13.3419 4.95489 13.1464 5.13534L7.99999 9.88586L2.85359 5.13534C2.65811 4.95489 2.3421 4.95489 2.14662 5.13534C1.95113 5.31579 1.95113 5.60748 2.14662 5.78793L7.64651 10.8648C7.74401 10.9548 7.872 11 8.00001 11C8.12802 11 8.25601 10.9548 8.35351 10.8648L13.8534 5.78793C14.0489 5.60748 14.0489 5.31579 13.8534 5.13534Z" />
  </svg>
);
