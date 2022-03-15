/* eslint-disable max-len */
import React, { HTMLAttributes } from "react";

interface IShareProps extends HTMLAttributes<SVGElement> {}

const Share = (props: IShareProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="current"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18.7848 15.6461C18.3467 15.6481 17.9137 15.741 17.5133 15.919C17.1129 16.097 16.7538 16.3561 16.4587 16.68L8.39101 12.3877C8.39101 12.2954 8.39101 12.2123 8.39101 12.1292C8.39132 11.9371 8.37276 11.7454 8.33561 11.5569L16.4402 7.31999C16.7353 7.64389 17.0944 7.90303 17.4948 8.08099C17.8952 8.25895 18.3282 8.35186 18.7664 8.35384C19.6037 8.35384 20.4066 8.02124 20.9987 7.4292C21.5907 6.83717 21.9233 6.03418 21.9233 5.19691C21.9233 4.35879 21.591 3.55486 20.9992 2.96136C20.4075 2.36786 19.6045 2.03321 18.7664 2.03076C17.9283 2.03321 17.1253 2.36786 16.5335 2.96136C15.9418 3.55486 15.6095 4.35879 15.6095 5.19691C15.6111 5.475 15.6515 5.75153 15.7295 6.01846L7.72639 10.2092C7.43448 9.82414 7.05783 9.51144 6.62563 9.29534C6.19343 9.07925 5.71729 8.96554 5.23408 8.96306C4.39597 8.96551 3.59301 9.30017 3.00124 9.89368C2.40947 10.4872 2.07714 11.2911 2.07715 12.1292C2.07715 12.9665 2.40975 13.7695 3.00179 14.3615C3.59383 14.9535 4.39682 15.2861 5.23408 15.2861C5.76729 15.2853 6.29157 15.1494 6.75806 14.8911C7.22454 14.6329 7.61802 14.2607 7.90178 13.8092L15.7295 17.9815C15.6516 18.2516 15.6112 18.5312 15.6095 18.8123C15.6095 19.6496 15.9421 20.4526 16.5341 21.0446C17.1261 21.6366 17.9291 21.9692 18.7664 21.9692C19.6037 21.9692 20.4066 21.6366 20.9987 21.0446C21.5907 20.4526 21.9233 19.6496 21.9233 18.8123C21.9233 17.9774 21.5936 17.1762 21.0058 16.5832C20.418 15.9902 19.6198 15.6535 18.7848 15.6461ZM18.7848 3.50769C19.0062 3.50769 19.2255 3.55144 19.4299 3.63644C19.6343 3.72145 19.8199 3.84602 19.9761 4.003C20.1322 4.15999 20.2557 4.34627 20.3396 4.55117C20.4235 4.75606 20.4661 4.97551 20.4649 5.19691C20.4649 5.64247 20.2879 6.06979 19.9728 6.38486C19.6577 6.69992 19.2304 6.87692 18.7848 6.87692C18.3393 6.87692 17.912 6.69992 17.5969 6.38486C17.2818 6.06979 17.1048 5.64247 17.1048 5.19691C17.1012 4.97397 17.1419 4.75254 17.2247 4.5455C17.3075 4.33847 17.4306 4.14998 17.587 3.99103C17.7434 3.83209 17.9298 3.70586 18.1355 3.61971C18.3411 3.53355 18.5619 3.48919 18.7848 3.48923V3.50769ZM5.271 13.8C4.82544 13.8 4.39812 13.623 4.08306 13.3079C3.76799 12.9929 3.59099 12.5655 3.59099 12.12C3.58978 11.8986 3.63234 11.6791 3.71622 11.4742C3.80011 11.2694 3.92366 11.0831 4.07979 10.9261C4.23591 10.7691 4.42152 10.6445 4.62595 10.5595C4.83038 10.4745 5.0496 10.4308 5.271 10.4308C5.4924 10.4308 5.71162 10.4745 5.91605 10.5595C6.12048 10.6445 6.30609 10.7691 6.46221 10.9261C6.61834 11.0831 6.74189 11.2694 6.82578 11.4742C6.90966 11.6791 6.95221 11.8986 6.95099 12.12C6.95099 12.5655 6.77399 12.9929 6.45893 13.3079C6.14387 13.623 5.71656 13.8 5.271 13.8ZM18.8033 20.4831C18.3577 20.4831 17.9304 20.3061 17.6154 19.991C17.3003 19.676 17.1233 19.2486 17.1233 18.8031C17.1221 18.5817 17.1647 18.3622 17.2485 18.1573C17.3324 17.9524 17.456 17.7661 17.6121 17.6092C17.7682 17.4522 17.9538 17.3276 18.1583 17.2426C18.3627 17.1576 18.5819 17.1138 18.8033 17.1138C19.0247 17.1138 19.2439 17.1576 19.4484 17.2426C19.6528 17.3276 19.8384 17.4522 19.9945 17.6092C20.1507 17.7661 20.2742 17.9524 20.3581 18.1573C20.442 18.3622 20.4845 18.5817 20.4833 18.8031C20.4821 19.0245 20.4372 19.2435 20.351 19.4474C20.2649 19.6514 20.1393 19.8363 19.9815 19.9916C19.8236 20.1469 19.6367 20.2694 19.4313 20.3522C19.2259 20.4349 19.0062 20.4763 18.7848 20.4738L18.8033 20.4831Z" />
  </svg>
);

export default Share;
