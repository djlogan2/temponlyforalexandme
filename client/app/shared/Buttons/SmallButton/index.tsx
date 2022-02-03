import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC } from "react";
import { useAppSelector } from "/client/app/store/hooks";

interface ISmallButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "red" | "dark";
}

const SmallButton: FC<ISmallButtonProps> = ({
  children,
  className,
  type = "button",
  color = "dark",
  ...rest
}) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <button
      {...rest}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={clsx(
        className,
        classes.smallButton,
        color === "red" && classes.smallButtonRed,
        color === "dark" && classes.smallButtonDark,
      )}
    >
      {children}
    </button>
  );
};

export default SmallButton;
