import clsx from "clsx";
import React, { FC, ButtonHTMLAttributes, FCICC } from "react";
import useStyles from "./styles";
import { useAppSelector } from "/client/app/store/hooks";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  className?: string;
  hoverText: string;
  onButtonClick?: () => void;
}

const ActionButton: FCICC<ActionButtonProps> = ({
  name,
  className,
  onButtonClick,
  hoverText,
  token,
  ...rest
}) => {
  const activeButtonClass = useAppSelector(
    (state) => state.theming.classes.activebutton,
  );
  const classes = useStyles();

  return (
    <div className={clsx(classes.container, activeButtonClass)}>
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        name={name}
        onClick={onButtonClick}
        className={classes.button}
        {...rest}
      >
        {window.i18n.translate(token.token, ...token.args)}
      </button>
      <div className={classes.hoverElement}>{hoverText}</div>
    </div>
  );
};

export default ActionButton;
