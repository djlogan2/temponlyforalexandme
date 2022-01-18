// import React, { FC, ButtonHTMLAttributes } from "react";
// import useStyles from "./styles";
//
// interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   name: string;
//   className?: string;
//   hoverText: string;
//   onButtonClick?: () => void;
// }
//
// const BasicButton: FC<BasicButtonProps> = ({
//   name,
//   // icon,
//   className,
//   onButtonClick,
//   children,
//   hoverText,
//   ...rest
// }) => {
//   const classes = useStyles();
//
//   return (
//     <div className={classes.container}>
//     <button name={name} onClick={onButtonClick} className={classes.button} {...rest}>
//       {children}
//     </button>
//       <div className={classes.hoverElement}>{hoverText}</div>
//     </div>
//   );
// };
//
// export default BasicButton;
