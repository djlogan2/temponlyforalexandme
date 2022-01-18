import React, { FC, ButtonHTMLAttributes } from "react";
import useStyles from "./styles";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  // icon: string;
  className?: string;
  hoverText: string;
  onButtonClick?: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({
  name,
  // icon,
  className,
  onButtonClick,
  children,
  hoverText,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        name={name}
        onClick={onButtonClick}
        className={classes.button}
        {...rest}
      >
        {children}
      </button>
      <div className={classes.hoverElement}>{hoverText}</div>
    </div>
  );
};

export default ActionButton;
