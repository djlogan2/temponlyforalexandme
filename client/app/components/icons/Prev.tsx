import React, { HTMLAttributes } from "react";

interface IPrevProps extends HTMLAttributes<SVGElement> {}

const Prev = (props: IPrevProps) => (
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
      d="M14.3437 15.5784L14.3437 2.42167L4.17715 9.00006L14.3437 15.5784ZM15.2292 15.9128C15.2292 16.4985 14.6235 16.8581 14.1515 16.5527L3.46819 9.64002C3.01622 9.34757 3.01622 8.65254 3.46819 8.36009L14.1515 1.44738C14.6235 1.14197 15.2292 1.50165 15.2292 2.08735L15.2292 15.9128Z"
    />
  </svg>
);

export default Prev;
