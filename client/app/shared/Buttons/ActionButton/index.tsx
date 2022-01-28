import React, { ButtonHTMLAttributes, FCICC } from "react";
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
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div className={classes.activeButtonContainer}>
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        name={name}
        onClick={onButtonClick}
        className={classes.activeButton}
        {...rest}
      >
        {window.i18n.translate(token.token, ...token.args)}
      </button>
      <div className={classes.activeButtonHoverElement}>{hoverText}</div>
    </div>
  );
};

export default ActionButton;
