import React, { HTMLAttributes } from "react";

interface IPlusProps extends HTMLAttributes<SVGElement> {}

export const Plus = (props: IPlusProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="current"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21.2303 11.2615H12.738V2.76923C12.738 2.57337 12.6602 2.38554 12.5217 2.24705C12.3832 2.10856 12.1954 2.03076 11.9995 2.03076C11.8036 2.03076 11.6158 2.10856 11.4773 2.24705C11.3388 2.38554 11.261 2.57337 11.261 2.76923V11.2615H2.76873C2.57288 11.2615 2.38505 11.3393 2.24656 11.4778C2.10807 11.6163 2.03027 11.8041 2.03027 12C2.03027 12.1958 2.10807 12.3837 2.24656 12.5222C2.38505 12.6607 2.57288 12.7385 2.76873 12.7385H11.261V21.2308C11.261 21.4266 11.3388 21.6145 11.4773 21.7529C11.6158 21.8914 11.8036 21.9692 11.9995 21.9692C12.1954 21.9692 12.3832 21.8914 12.5217 21.7529C12.6602 21.6145 12.738 21.4266 12.738 21.2308V12.7385H21.2303C21.4261 12.7385 21.614 12.6607 21.7524 12.5222C21.8909 12.3837 21.9687 12.1958 21.9687 12C21.9687 11.8041 21.8909 11.6163 21.7524 11.4778C21.614 11.3393 21.4261 11.2615 21.2303 11.2615Z" />
  </svg>
);
