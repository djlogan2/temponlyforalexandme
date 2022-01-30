import React, { ButtonHTMLAttributes, FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
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
  const translation = useTranslate(token);

  return (
    <div className={classes.activeButtonContainer}>
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        name={name}
        onClick={onButtonClick}
        className={classes.activeButton}
        {...rest}
      >
        {translation}
      </button>
      <div className={classes.activeButtonHoverElement}>{hoverText}</div>
    </div>
  );
};

export default ActionButton;
