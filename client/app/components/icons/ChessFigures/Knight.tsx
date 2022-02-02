import React, { FC } from "react";

interface IKnightProps {
  color: string;
}
// eslint-disable max-len

const Knight: FC<IKnightProps> = ({ color }) => (
  <svg
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.9273 0.696778C9.63903 0.696933 9.35727 0.783815 9.11765 0.946441C8.87804 1.10907 8.69132 1.34013 8.58111 1.61043C8.4709 1.88072 8.44214 2.1781 8.49847 2.46498C8.55481 2.75185 8.6937 3.01534 8.89759 3.22212C9.10149 3.42891 9.36123 3.56971 9.64397 3.62672C9.92672 3.68373 10.2198 3.65439 10.4861 3.54241C10.7524 3.43044 10.98 3.24085 11.1402 2.99762C11.3003 2.75439 11.3858 2.46844 11.3858 2.17593C11.3858 1.98162 11.3481 1.78921 11.2747 1.6097C11.2014 1.43019 11.094 1.2671 10.9586 1.12973C10.8231 0.992371 10.6623 0.883434 10.4854 0.809146C10.3084 0.734858 10.1188 0.696675 9.9273 0.696778Z"
      fill="#F5F5F5"
    />
    <path
      d="M9.92729 3.85044C9.60087 3.84982 9.28195 3.75102 9.01085 3.56654C8.73974 3.38205 8.52862 3.12015 8.40416 2.81395C8.2797 2.50774 8.24749 2.17097 8.31161 1.84619C8.37572 1.52142 8.53328 1.22322 8.76436 0.989277C8.99545 0.755338 9.2897 0.596162 9.60991 0.531866C9.93013 0.467569 10.2619 0.501039 10.5634 0.628044C10.8649 0.75505 11.1225 0.96989 11.3037 1.24541C11.4849 1.52094 11.5815 1.84478 11.5813 2.176C11.5807 2.62058 11.4061 3.04671 11.096 3.36071C10.7858 3.6747 10.3654 3.85086 9.92729 3.85044V3.85044ZM9.92729 0.892922C9.67734 0.893542 9.43316 0.96932 9.22563 1.11068C9.01809 1.25205 8.8565 1.45265 8.76127 1.68716C8.66604 1.92167 8.64144 2.17955 8.69058 2.42824C8.73972 2.67692 8.86039 2.90525 9.03735 3.08438C9.21432 3.26351 9.43963 3.3854 9.68483 3.43466C9.93003 3.48391 10.1841 3.45832 10.415 3.36111C10.6459 3.26391 10.8432 3.09945 10.982 2.88852C11.1208 2.67759 11.1949 2.42964 11.1949 2.176C11.1947 2.0073 11.1617 1.84029 11.0979 1.68451C11.0341 1.52873 10.9407 1.38722 10.823 1.26808C10.7053 1.14893 10.5656 1.05448 10.4119 0.99011C10.2582 0.92574 10.0936 0.892716 9.92729 0.892922V0.892922Z"
      fill="#9698A2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0285 2.17603C14.7882 2.17603 14.5532 2.24835 14.3534 2.38386C14.1536 2.51937 13.9979 2.71196 13.9059 2.93729C13.814 3.16262 13.79 3.41055 13.8369 3.64973C13.8839 3.8889 13.9997 4.10858 14.1697 4.28097C14.3397 4.45337 14.5562 4.57072 14.792 4.61821C15.0277 4.66569 15.272 4.64116 15.494 4.54773C15.716 4.45429 15.9057 4.29615 16.0391 4.0933C16.1726 3.89045 16.2437 3.65201 16.2435 3.40813C16.2436 3.24623 16.2123 3.0859 16.1512 2.93632C16.0902 2.78674 16.0007 2.65084 15.8878 2.53639C15.775 2.42195 15.641 2.33122 15.4935 2.26938C15.3461 2.20754 15.1881 2.17582 15.0285 2.17603V2.17603Z"
      fill="#F5F5F5"
    />
    <path
      d="M15.0285 4.83716C14.75 4.83716 14.4777 4.75336 14.2461 4.59634C14.0145 4.43933 13.834 4.21615 13.7274 3.95504C13.6209 3.69394 13.593 3.40662 13.6473 3.12943C13.7016 2.85224 13.8358 2.59762 14.0327 2.39778C14.2296 2.19794 14.4806 2.06184 14.7537 2.00671C15.0269 1.95157 15.3101 1.97987 15.5674 2.08802C15.8247 2.19618 16.0447 2.37933 16.1994 2.61432C16.3541 2.84931 16.4367 3.12558 16.4367 3.40821C16.4365 3.78713 16.2881 4.15047 16.024 4.4184C15.76 4.68634 15.4019 4.83696 15.0285 4.83716ZM15.0285 2.37217C14.8264 2.37217 14.6288 2.433 14.4607 2.54696C14.2927 2.66092 14.1617 2.8229 14.0844 3.0124C14.0071 3.2019 13.9869 3.41041 14.0264 3.61155C14.0659 3.8127 14.1633 3.99744 14.3062 4.14241C14.4492 4.28738 14.6314 4.38606 14.8296 4.42598C15.0279 4.4659 15.2333 4.44525 15.42 4.36666C15.6067 4.28807 15.7663 4.15505 15.8784 3.98444C15.9906 3.81384 16.0504 3.6133 16.0503 3.40821C16.0501 3.13336 15.9423 2.86984 15.7507 2.67557C15.5591 2.4813 15.2993 2.37217 15.0285 2.37217V2.37217Z"
      fill="#9698A2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.8269 2.17603C4.58653 2.17587 4.35151 2.24807 4.15159 2.38348C3.95166 2.51889 3.79581 2.71143 3.70375 2.93674C3.61169 3.16206 3.58757 3.41002 3.63442 3.64924C3.68128 3.88847 3.79701 4.10823 3.96698 4.2807C4.13695 4.45317 4.35352 4.5706 4.58928 4.61815C4.82504 4.6657 5.06941 4.64121 5.29145 4.5478C5.5135 4.45439 5.70325 4.29625 5.8367 4.09338C5.97015 3.89051 6.0413 3.65204 6.04114 3.40813C6.04114 3.08135 5.91321 2.76796 5.6855 2.5369C5.45779 2.30584 5.14894 2.17603 4.8269 2.17603Z"
      fill="#F5F5F5"
    />
    <path
      d="M4.82609 4.83716C4.54756 4.83716 4.2753 4.75336 4.04371 4.59634C3.81213 4.43933 3.63163 4.21615 3.52504 3.95504C3.41846 3.69394 3.39057 3.40662 3.44491 3.12943C3.49924 2.85224 3.63337 2.59762 3.83031 2.39778C4.02726 2.19794 4.27818 2.06184 4.55135 2.00671C4.82453 1.95157 5.10768 1.97987 5.365 2.08802C5.62232 2.19618 5.84226 2.37933 5.997 2.61432C6.15174 2.84931 6.23433 3.12558 6.23433 3.40821C6.23412 3.78713 6.08569 4.15047 5.82164 4.4184C5.55759 4.68634 5.19951 4.83696 4.82609 4.83716ZM4.82609 2.37217C4.62396 2.37217 4.42638 2.433 4.25833 2.54696C4.09029 2.66092 3.95932 2.8229 3.88201 3.0124C3.80469 3.2019 3.7845 3.41041 3.82399 3.61155C3.86348 3.8127 3.96087 3.99744 4.10385 4.14241C4.24683 4.28738 4.42896 4.38606 4.62722 4.42598C4.82548 4.4659 5.03095 4.44525 5.21764 4.36666C5.40434 4.28807 5.56387 4.15505 5.67605 3.98444C5.78823 3.81384 5.84803 3.6133 5.84787 3.40821C5.84767 3.13336 5.73993 2.86984 5.54833 2.67557C5.35673 2.4813 5.09695 2.37217 4.82609 2.37217V2.37217Z"
      fill="#9698A2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.1867 4.64112C17.9944 4.64065 17.8063 4.69807 17.6463 4.80612C17.4862 4.91416 17.3613 5.06796 17.2874 5.24806C17.2135 5.42816 17.194 5.62645 17.2312 5.81784C17.2684 6.00923 17.3608 6.18511 17.4965 6.32321C17.6323 6.46132 17.8054 6.55545 17.994 6.59368C18.1825 6.63191 18.3779 6.61252 18.5556 6.53798C18.7333 6.46343 18.8851 6.33707 18.992 6.1749C19.0989 6.01273 19.1559 5.82204 19.1559 5.62696C19.156 5.4974 19.1309 5.36909 19.0821 5.24939C19.0332 5.12968 18.9616 5.02093 18.8713 4.92935C18.781 4.83778 18.6737 4.76518 18.5557 4.71572C18.4377 4.66626 18.3113 4.64091 18.1836 4.64112H18.1867Z"
      fill="#F5F5F5"
    />
    <path
      d="M18.1866 6.80864C17.9562 6.80849 17.7311 6.73904 17.5397 6.60907C17.3482 6.47911 17.1991 6.29447 17.111 6.07849C17.023 5.86251 17 5.62489 17.0451 5.39567C17.0901 5.16646 17.2011 4.95594 17.364 4.79072C17.5269 4.62551 17.7345 4.51302 17.9604 4.46748C18.1863 4.42194 18.4205 4.44539 18.6333 4.53487C18.8461 4.62435 19.0279 4.77583 19.1559 4.97018C19.2838 5.16453 19.3521 5.39301 19.3521 5.62673C19.3519 5.94027 19.229 6.24089 19.0105 6.46252C18.7919 6.68415 18.4956 6.80864 18.1866 6.80864V6.80864ZM18.1866 4.83696C18.0327 4.83712 17.8823 4.88357 17.7544 4.97045C17.6265 5.05732 17.5269 5.18072 17.4681 5.32505C17.4093 5.46937 17.394 5.62814 17.4241 5.78129C17.4542 5.93444 17.5284 6.07509 17.6373 6.18546C17.7462 6.29583 17.8848 6.37098 18.0358 6.40139C18.1868 6.4318 18.3432 6.41611 18.4854 6.35631C18.6276 6.29651 18.7491 6.19528 18.8346 6.06542C18.92 5.93556 18.9657 5.7829 18.9657 5.62673C18.9657 5.52295 18.9455 5.42019 18.9064 5.32432C18.8672 5.22845 18.8098 5.14135 18.7374 5.068C18.6651 4.99466 18.5792 4.9365 18.4847 4.89686C18.3902 4.85721 18.2889 4.83686 18.1866 4.83696Z"
      fill="#9698A2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.66875 4.64111C1.4766 4.64111 1.28876 4.69893 1.12899 4.80726C0.96922 4.91558 0.844694 5.06955 0.77116 5.24969C0.697626 5.42983 0.678386 5.62805 0.715873 5.81928C0.75336 6.01051 0.845891 6.18617 0.981765 6.32405C1.11764 6.46192 1.29075 6.55581 1.47921 6.59385C1.66767 6.63189 1.86302 6.61237 2.04055 6.53775C2.21807 6.46313 2.36981 6.33678 2.47656 6.17466C2.58332 6.01254 2.6403 5.82193 2.6403 5.62695C2.6403 5.49749 2.61517 5.3693 2.56634 5.24969C2.51752 5.13008 2.44596 5.0214 2.35574 4.92986C2.26552 4.83831 2.15842 4.7657 2.04055 4.71616C1.92267 4.66661 1.79634 4.64111 1.66875 4.64111V4.64111Z"
      fill="#F5F5F5"
    />
    <path
      d="M1.66877 6.80864C1.4384 6.80864 1.2132 6.73933 1.02166 6.60946C0.830112 6.47959 0.680821 6.295 0.592662 6.07903C0.504503 5.86307 0.481436 5.62542 0.526379 5.39616C0.571322 5.16689 0.682256 4.95629 0.845153 4.791C1.00805 4.62571 1.21559 4.51314 1.44154 4.46753C1.66748 4.42193 1.90168 4.44534 2.11451 4.53479C2.32735 4.62425 2.50926 4.77574 2.63725 4.9701C2.76523 5.16446 2.83355 5.39297 2.83355 5.62673C2.83314 5.94007 2.71029 6.24045 2.49194 6.46201C2.27359 6.68357 1.97756 6.80823 1.66877 6.80864ZM1.66877 4.83696C1.51484 4.83696 1.36436 4.88328 1.23636 4.97006C1.10837 5.05685 1.00861 5.18019 0.949699 5.3245C0.89079 5.46881 0.875377 5.62761 0.905408 5.78081C0.93544 5.93401 1.00957 6.07473 1.11842 6.18519C1.22727 6.29564 1.36595 6.37086 1.51693 6.40133C1.66791 6.4318 1.8244 6.41616 1.96662 6.35639C2.10884 6.29661 2.2304 6.19538 2.31592 6.06551C2.40144 5.93563 2.44709 5.78294 2.44709 5.62673C2.44689 5.41734 2.36482 5.21658 2.2189 5.06851C2.07298 4.92045 1.87513 4.83717 1.66877 4.83696V4.83696Z"
      fill="#9698A2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.90954 5.62695C6.62699 5.62695 5.06958 8.14763 5.06958 10.0636H14.7866C14.7866 8.14763 13.1921 5.62695 9.91031 5.62695H9.90954Z"
      fill="#F5F5F5"
    />
    <path
      d="M14.7866 10.2595H5.06954C5.01829 10.2595 4.96914 10.2388 4.93291 10.202C4.89667 10.1653 4.87631 10.1154 4.87631 10.0634C4.87631 8.13956 6.43759 5.43066 9.9095 5.43066C13.4061 5.43066 14.979 8.13956 14.979 10.0634C14.979 10.1153 14.9588 10.165 14.9227 10.2018C14.8866 10.2385 14.8377 10.2593 14.7866 10.2595V10.2595ZM5.26895 9.86733H14.5871C14.4843 8.12388 13.022 5.8228 9.91027 5.8228C6.82173 5.8228 5.37097 8.12388 5.26895 9.86733Z"
      fill="#9698A2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.92807 5.13354C9.00058 5.13354 8.82126 7.74676 7.97724 7.84245C7.11854 7.93891 6.38505 5.38216 5.50393 5.64646C4.79904 5.85508 5.1368 7.76402 4.65373 8.02911C3.98903 8.38282 3.14888 6.72485 2.15182 7.41972C5.37718 11.425 5.96536 12.5638 5.91744 15.486H13.9364C13.8877 12.5638 14.4774 11.425 17.7012 7.41972C16.708 6.72406 15.8679 8.38203 15.207 8.02597C14.7224 7.7648 15.0602 5.85351 14.3568 5.64333C13.4757 5.38216 12.7391 7.93578 11.8835 7.83931C11.0356 7.74677 10.8571 5.13354 9.92807 5.13354Z"
      fill="#F5F5F5"
    />
    {/* eslint-disable-next-line max-len */}
    <path
      /* eslint-disable-next-line max-len */
      d="M13.9364 15.6821H5.92055C5.8949 15.6822 5.8695 15.677 5.84586 15.6669C5.82223 15.6568 5.80084 15.642 5.78298 15.6233C5.76478 15.605 5.75046 15.5831 5.7409 15.5589C5.73133 15.5348 5.72671 15.5089 5.72733 15.4829C5.77293 12.6595 5.286 11.6188 2.005 7.54443C1.9881 7.52334 1.97568 7.49895 1.9685 7.47277C1.96132 7.44659 1.95953 7.41919 1.96326 7.39228C1.96698 7.36548 1.97619 7.33977 1.9903 7.31681C2.00441 7.29385 2.02311 7.27414 2.04519 7.25895C2.71684 6.78838 3.3429 7.2268 3.79969 7.54757C4.15832 7.79854 4.38865 7.9452 4.55946 7.85265C4.68776 7.78364 4.74264 7.30366 4.78206 6.95387C4.85471 6.32644 4.93664 5.60648 5.44676 5.45511C6.03881 5.28021 6.50178 5.96724 6.9493 6.63153C7.28088 7.12327 7.65651 7.68168 7.95408 7.65109C8.25165 7.62051 8.49512 6.99936 8.71076 6.4535C9.00756 5.71 9.3144 4.94141 9.92577 4.94141C10.5371 4.94141 10.844 5.71078 11.1408 6.45428C11.3587 7.00328 11.6045 7.61815 11.8975 7.65109C12.1904 7.68403 12.5738 7.12641 12.9022 6.63153C13.3505 5.96803 13.8135 5.281 14.404 5.45511C14.9149 5.60726 14.9968 6.32331 15.0695 6.95465C15.1089 7.30444 15.1638 7.78364 15.2921 7.85265C15.4629 7.9452 15.6932 7.79854 16.0519 7.54678C16.5086 7.2268 17.1339 6.78838 17.8056 7.25895C17.8277 7.27414 17.8464 7.29385 17.8605 7.31681C17.8746 7.33977 17.8838 7.36548 17.8875 7.39228C17.8911 7.41919 17.8892 7.44654 17.882 7.47269C17.8748 7.49885 17.8625 7.52325 17.8458 7.54443C14.5694 11.6188 14.0825 12.6571 14.1319 15.4829C14.1323 15.5089 14.1275 15.5347 14.1179 15.5588C14.1084 15.5829 14.0942 15.6048 14.0762 15.6234C14.0583 15.6419 14.0369 15.6566 14.0133 15.6667C13.9897 15.6768 13.9643 15.682 13.9387 15.6821H13.9364ZM6.1161 15.29H13.7409C13.7254 12.4015 14.4627 11.1419 17.4029 7.4809C17.0543 7.3562 16.7189 7.55933 16.2768 7.87304C15.8988 8.13813 15.5039 8.41341 15.1174 8.20244C14.8082 8.03617 14.7557 7.55776 14.6923 7.00328C14.6367 6.51781 14.5679 5.91391 14.3058 5.83392C13.9851 5.7398 13.5847 6.33193 13.2315 6.85348C12.7994 7.49267 12.3929 8.09578 11.8627 8.03853C11.3325 7.98127 11.0735 7.30915 10.7899 6.59859C10.5526 6.00489 10.2836 5.33119 9.93273 5.33119C9.58183 5.33119 9.3144 6.0041 9.07634 6.59859C8.79269 7.30915 8.52449 7.97971 8.00355 8.03853C7.48261 8.09735 7.06601 7.49424 6.6355 6.85426C6.28228 6.33115 5.88191 5.73823 5.56038 5.8347C5.29527 5.91313 5.22648 6.51702 5.17392 7.00249C5.11055 7.55698 5.05567 8.03539 4.74882 8.20166C4.35773 8.41341 3.96587 8.13813 3.58946 7.87304C3.14736 7.55933 2.81191 7.35934 2.46333 7.4809C5.39343 11.1427 6.13079 12.4015 6.1161 15.29V15.29Z"
      fill="#9698A2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.00685 17.0152C3.98248 17.353 3.98584 17.6922 4.01689 18.0293H15.8424C15.8735 17.6922 15.8768 17.353 15.8525 17.0152C15.8098 16.5282 15.5884 16.0752 15.2321 15.746C14.8758 15.4169 14.4105 15.2356 13.9287 15.2381H5.93062C5.44881 15.2357 4.9837 15.4171 4.62742 15.7462C4.27113 16.0754 4.04966 16.5283 4.00685 17.0152Z"
      fill="#F5F5F5"
    />
    <path
      d="M15.8416 18.2256H4.01609C3.96774 18.2258 3.9211 18.2075 3.88544 18.1743C3.84978 18.1412 3.82772 18.0957 3.82364 18.0468C3.79129 17.6987 3.78767 17.3485 3.81282 16.9998V16.9998C3.86052 16.4637 4.10426 15.9651 4.49606 15.6022C4.88786 15.2394 5.39935 15.0385 5.92982 15.0391H13.9279C14.4583 15.0383 14.9698 15.2392 15.3615 15.6021C15.7532 15.965 15.9968 16.4637 16.0441 16.9998C16.0695 17.3484 16.0662 17.6987 16.0341 18.0468C16.0298 18.0956 16.0077 18.141 15.9721 18.1741C15.9365 18.2072 15.8899 18.2256 15.8416 18.2256V18.2256ZM4.19618 17.8335H15.6623C15.6809 17.5663 15.6809 17.2982 15.6623 17.0311C15.6222 16.5937 15.4223 16.1874 15.1019 15.8919C14.7816 15.5964 14.3639 15.4332 13.931 15.4343H5.93059C5.49757 15.4329 5.0797 15.596 4.75927 15.8915C4.43884 16.187 4.23906 16.5936 4.19927 17.0311C4.17921 17.2982 4.17818 17.5663 4.19618 17.8335V17.8335Z"
      fill="#9698A2"
    />
    <path
      d="M15.0363 18.5H4.82149C4.77025 18.5 4.7211 18.4794 4.68486 18.4426C4.64862 18.4059 4.62827 18.356 4.62827 18.304C4.62827 18.252 4.64862 18.2021 4.68486 18.1653C4.7211 18.1286 4.77025 18.1079 4.82149 18.1079H15.0363C15.0875 18.1079 15.1367 18.1286 15.1729 18.1653C15.2091 18.2021 15.2295 18.252 15.2295 18.304C15.2295 18.356 15.2091 18.4059 15.1729 18.4426C15.1367 18.4794 15.0875 18.5 15.0363 18.5V18.5Z"
      fill="#9698A2"
    />
  </svg>
);

export default Knight;