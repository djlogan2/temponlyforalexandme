import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC } from "react";
import { useAppSelector } from "/client/app/store/hooks";

interface IRegularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "blue" | "dark";
}

const RegularButton: FC<IRegularButtonProps> = ({
  children,
  className,
  color = "blue",
  type = "button",
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
        classes.regularButton,
        color === "blue" && classes.regularButtonBlue,
        color === "dark" && classes.regularButtonDark,
      )}
    >
      {children}
    </button>
  );
};

export default RegularButton;
