import React, { HTMLAttributes } from "react";

interface IUploadProps extends HTMLAttributes<SVGElement> {}

const Upload = (props: IUploadProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="current"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2517 4.51196L7.69787 8.06581C7.5574 8.19309 7.37336 8.26147 7.18385 8.25681C6.99435 8.25214 6.8139 8.17478 6.67986 8.04074C6.54582 7.9067 6.46846 7.72625 6.46379 7.53675C6.45913 7.34724 6.52752 7.1632 6.6548 7.02273L11.4271 2.24119C11.5678 2.10743 11.7545 2.03284 11.9486 2.03284C12.1428 2.03284 12.3295 2.10743 12.4702 2.24119L17.3533 7.12427C17.4576 7.22701 17.529 7.35846 17.5585 7.50189C17.5879 7.64533 17.5741 7.79429 17.5187 7.92983C17.4632 8.06538 17.3688 8.18139 17.2473 8.26313C17.1258 8.34487 16.9828 8.38864 16.8363 8.38888C16.7383 8.38872 16.6413 8.36905 16.551 8.33101C16.4606 8.29298 16.3788 8.23734 16.3102 8.16735L12.7286 4.58581L12.7286 14.0289C12.7286 14.2247 12.6508 14.4126 12.5123 14.5511C12.3739 14.6895 12.186 14.7673 11.9902 14.7673C11.7943 14.7673 11.6065 14.6895 11.468 14.5511C11.3295 14.4126 11.2517 14.2247 11.2517 14.0289L11.2517 4.51196ZM20.7081 14.8821C20.8466 14.7436 21.0344 14.6658 21.2303 14.6658C21.4261 14.6658 21.614 14.7436 21.7524 14.8821C21.8909 15.0205 21.9687 15.2084 21.9687 15.4042L21.9687 19.5673C21.9687 20.2038 21.7159 20.8143 21.2658 21.2644C20.8157 21.7144 20.2053 21.9673 19.5687 21.9673L4.43027 21.9673C3.7945 21.9649 3.18547 21.7112 2.73591 21.2617C2.28634 20.8121 2.0327 20.2031 2.03027 19.5673L2.03027 15.4042C2.03027 15.2084 2.10807 15.0205 2.24656 14.8821C2.38505 14.7436 2.57288 14.6658 2.76873 14.6658C2.96458 14.6658 3.15242 14.7436 3.29091 14.8821C3.42939 15.0205 3.5072 15.2084 3.5072 15.4042L3.5072 19.5673C3.5072 19.8121 3.60445 20.0469 3.77756 20.22C3.95067 20.3931 4.18546 20.4904 4.43027 20.4904L19.5687 20.4904C19.8136 20.4904 20.0483 20.3931 20.2215 20.22C20.3946 20.0469 20.4918 19.8121 20.4918 19.5673L20.4918 15.4042C20.4918 15.2084 20.5696 15.0205 20.7081 14.8821Z"
    />
  </svg>
);

export default Upload;
