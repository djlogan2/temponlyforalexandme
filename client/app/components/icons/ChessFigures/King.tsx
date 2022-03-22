import React, { FC, HTMLAttributes } from "react";

interface IKingProps extends HTMLAttributes<SVGElement> {}

const King = (props: IKingProps) => (
  <svg
    width="32"
    height="34"
    viewBox="0 0 32 34"
    fill="current"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_867_33964)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.4788 29.532C10.4788 29.532 5.47781 18.5936 6.22564 16.4659C6.97348 14.3381 11.6874 12.7753 16.0287 12.7753C20.3701 12.7753 25.0882 14.334 25.8318 16.4659C26.5755 18.5978 21.5815 29.532 21.5815 29.532H10.4788Z"
      />
      <path
        d="M21.5928 29.8756H10.4789C10.4115 29.8757 10.3455 29.8566 10.2889 29.8208C10.2322 29.785 10.1873 29.7338 10.1596 29.6736C9.6414 28.541 5.11797 18.5469 5.89522 16.3546C6.74809 13.9313 11.8219 12.4317 16.0344 12.4317C20.247 12.4317 25.3236 13.9313 26.1736 16.3546C26.9453 18.5538 22.4288 28.541 21.9121 29.6736C21.884 29.7336 21.8391 29.7846 21.7825 29.8204C21.7259 29.8562 21.6601 29.8753 21.5928 29.8756ZM10.7057 29.1884H21.3659C23.3447 24.8325 26.0196 18.026 25.5112 16.5786C24.8642 14.7354 20.436 13.119 16.0344 13.119C11.6328 13.119 7.21163 14.7354 6.55623 16.5786C6.39798 17.0349 6.42598 18.5538 8.39781 23.6725C9.35851 26.1658 10.3962 28.5011 10.7057 29.1884Z"
        fill="#9698A2"
      />
      <path d="M14.3807 10.6888V7.91919H11.2031V4.81279H14.3807V1.73251H17.6886V4.81279H20.8662V7.91919H17.6886V10.6888" />
      <path
        d="M18.0392 10.6888H17.339V7.91919C17.3388 7.87402 17.3477 7.82925 17.3652 7.78748C17.3828 7.7457 17.4085 7.70775 17.4411 7.67581C17.4736 7.64386 17.5123 7.61856 17.5549 7.60135C17.5974 7.58415 17.643 7.57538 17.6891 7.57557H20.5166V5.15643H17.6891C17.5962 5.15643 17.5072 5.12022 17.4415 5.05578C17.3759 4.99134 17.339 4.90393 17.339 4.8128V2.07614H14.7313V4.8128C14.7315 4.85797 14.7226 4.90274 14.7051 4.94451C14.6875 4.98629 14.6618 5.02424 14.6292 5.05618C14.5967 5.08813 14.558 5.11343 14.5154 5.13064C14.4729 5.14784 14.4273 5.15661 14.3812 5.15643H11.5537V7.57557H14.3812C14.4273 7.57538 14.4729 7.58415 14.5154 7.60135C14.558 7.61856 14.5967 7.64386 14.6292 7.67581C14.6618 7.70775 14.6875 7.7457 14.7051 7.78748C14.7226 7.82925 14.7315 7.87402 14.7313 7.91919V10.6888H14.0311V8.26282H11.2036C11.1108 8.26282 11.0217 8.22662 10.9561 8.16218C10.8904 8.09773 10.8535 8.01033 10.8535 7.91919V4.8128C10.8533 4.76762 10.8623 4.72285 10.8798 4.68108C10.8973 4.63931 10.9231 4.60136 10.9557 4.56941C10.9882 4.53747 11.0269 4.51216 11.0694 4.49496C11.112 4.47775 11.1576 4.46899 11.2036 4.46917H14.0311V1.73252C14.0311 1.64138 14.068 1.55398 14.1337 1.48953C14.1993 1.42509 14.2884 1.38889 14.3812 1.38889H17.6891C17.7351 1.38871 17.7807 1.39747 17.8233 1.41468C17.8658 1.43188 17.9045 1.45718 17.9371 1.48913C17.9696 1.52107 17.9954 1.55903 18.0129 1.6008C18.0304 1.64257 18.0394 1.68734 18.0392 1.73252V4.46917H20.8667C20.9127 4.46899 20.9583 4.47775 21.0009 4.49496C21.0434 4.51216 21.0821 4.53747 21.1147 4.56941C21.1472 4.60136 21.173 4.63931 21.1905 4.68108C21.208 4.72285 21.217 4.76762 21.2168 4.8128V7.91919C21.2168 8.01033 21.1799 8.09773 21.1142 8.16218C21.0486 8.22662 20.9595 8.26282 20.8667 8.26282H18.0392V10.6888Z"
        fill="#9698A2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5489 10.6888H13.4905C13.3479 10.6901 13.2072 10.7207 13.0774 10.7787C12.9476 10.8367 12.8317 10.9208 12.7371 11.0256C12.5359 11.2496 12.4248 11.5379 12.4248 11.8366C12.4248 12.1352 12.5359 12.4235 12.7371 12.6475C12.8319 12.7519 12.948 12.8356 13.0777 12.8934C13.2075 12.9511 13.3481 12.9816 13.4905 12.9829H18.5489C18.6914 12.9816 18.832 12.9511 18.9618 12.8934C19.0915 12.8356 19.2075 12.7519 19.3024 12.6475C19.5036 12.4235 19.6147 12.1352 19.6147 11.8366C19.6147 11.5379 19.5036 11.2496 19.3024 11.0256C19.2078 10.9208 19.0919 10.8367 18.9621 10.7787C18.8323 10.7207 18.6915 10.6901 18.5489 10.6888Z"
      />
      <path
        d="M18.5484 13.3238H13.49C13.2988 13.322 13.1101 13.2812 12.9358 13.2041C12.7615 13.1269 12.6054 13.0151 12.4774 12.8757C12.2171 12.5885 12.0732 12.2175 12.0732 11.8331C12.0732 11.4487 12.2171 11.0777 12.4774 10.7906C12.605 10.651 12.7608 10.5392 12.9349 10.462C13.109 10.3849 13.2975 10.3441 13.4886 10.3425H18.547C18.7381 10.3443 18.9268 10.3851 19.1011 10.4622C19.2754 10.5393 19.4315 10.6511 19.5595 10.7906C19.8198 11.0777 19.9637 11.4487 19.9637 11.8331C19.9637 12.2175 19.8198 12.5885 19.5595 12.8757C19.4319 13.0152 19.2761 13.1271 19.102 13.2042C18.9279 13.2814 18.7394 13.3221 18.5484 13.3238ZM13.49 11.0297C13.3961 11.0309 13.3036 11.0515 13.2185 11.0901C13.1333 11.1287 13.0573 11.1844 12.9956 11.2538C12.8529 11.4143 12.7742 11.6201 12.7742 11.8331C12.7742 12.0462 12.8529 12.252 12.9956 12.4125C13.0573 12.4818 13.1333 12.5376 13.2185 12.5762C13.3036 12.6148 13.3961 12.6353 13.49 12.6365H18.5484C18.6422 12.6353 18.7347 12.6148 18.8198 12.5762C18.905 12.5376 18.981 12.4818 19.0427 12.4125C19.1854 12.252 19.2641 12.0462 19.2641 11.8331C19.2641 11.6201 19.1854 11.4143 19.0427 11.2538C18.981 11.1844 18.905 11.1287 18.8198 11.0901C18.7347 11.0515 18.6422 11.0309 18.5484 11.0297H13.49Z"
        fill="#9698A2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.26785 30.7801C5.22439 31.372 5.23048 31.9664 5.28606 32.5573H26.7128C26.7689 31.9664 26.7754 31.372 26.7324 30.7801C26.6552 29.9264 26.254 29.1323 25.6085 28.5552C24.9629 27.978 24.12 27.66 23.2467 27.664H8.75355C7.88042 27.6603 7.03769 27.9785 6.39217 28.5555C5.74665 29.1326 5.3454 29.9265 5.26785 30.7801Z"
      />
      <path
        d="M26.7134 32.9009H5.28658C5.19916 32.9006 5.115 32.8683 5.05052 32.8104C4.98605 32.7524 4.94588 32.673 4.93787 32.5875C4.88037 31.9774 4.87428 31.3637 4.91967 30.7526C5.00607 29.8133 5.44751 28.9397 6.15713 28.3038C6.86674 27.6678 7.79316 27.3156 8.75408 27.3163H23.2459C24.2069 27.3152 25.1335 27.6674 25.8431 28.3034C26.5528 28.9394 26.9942 29.8131 27.0803 30.7526C27.1263 31.3636 27.1203 31.9774 27.0621 32.5875C27.0541 32.673 27.0139 32.7524 26.9494 32.8104C26.8849 32.8683 26.8008 32.9006 26.7134 32.9009ZM5.61149 32.2137H26.3884C26.4215 31.7455 26.4215 31.2757 26.3884 30.8075C26.3158 30.0408 25.9536 29.3285 25.3732 28.8105C24.7928 28.2924 24.036 28.0061 23.2515 28.0077H8.75408C7.96954 28.0061 7.21275 28.2924 6.63232 28.8105C6.05189 29.3285 5.68977 30.0408 5.61709 30.8075C5.58214 31.2756 5.58027 31.7454 5.61149 32.2137Z"
        fill="#9698A2"
      />
      <path
        d="M25.289 33.3916H6.78077C6.68792 33.3916 6.59887 33.3554 6.53321 33.291C6.46755 33.2265 6.43066 33.1391 6.43066 33.048C6.43066 32.9569 6.46755 32.8695 6.53321 32.805C6.59887 32.7406 6.68792 32.7044 6.78077 32.7044H25.289C25.3819 32.7044 25.4709 32.7406 25.5366 32.805C25.6022 32.8695 25.6391 32.9569 25.6391 33.048C25.6391 33.1391 25.6022 33.2265 25.5366 33.291C25.4709 33.3554 25.3819 33.3916 25.289 33.3916Z"
        fill="#9698A2"
      />
    </g>
    <defs>
      <clipPath id="clip0_867_33964">
        <rect
          width="22.2222"
          height="32"
          fill="white"
          transform="translate(4.88867 1.38889)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default King;
