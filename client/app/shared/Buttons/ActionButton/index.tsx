import clsx from "clsx";
import React, { ButtonHTMLAttributes, FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import { useAppSelector } from "/client/app/store/hooks";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  className?: string;
  hoverText?: string;
  onButtonClick?: () => void;
  size?: "small" | "medium" | "big";
  color?: "red" | "dark" | "dark-light";
}

const ActionButton: FCICC<ActionButtonProps> = ({
  name,
  className,
  onButtonClick,
  hoverText,
  token,
  children,
  color = "dark",
  size = "medium",
  ...rest
}) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div
      className={clsx(
        classes.activeButtonContainer,
        hoverText && classes.activeButtonContainerHover,
      )}
    >
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        name={name}
        onClick={onButtonClick}
        className={clsx({
          [classes.activeButton]: true,
          [classes.activeButtonRed]: color === "red",
          [classes.activeButtonDark]: color === "dark",
          [classes.activeButtonDarkLight]: color === "dark-light",
          [classes.activeButtonSmall]: size === "small",
          [classes.activeButtonMedium]: size === "medium",
          [classes.activeButtonBig]: size === "big",
        })}
        {...rest}
      >
        {children}
      </button>
      {hoverText && (
        <div className={classes.activeButtonHoverElement}>{hoverText}</div>
      )}
    </div>
  );
};

export default ActionButton;
