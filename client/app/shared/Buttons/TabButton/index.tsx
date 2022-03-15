import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";
import clsx from "clsx";
import Heading5 from "../../Typographies/Heading5";

interface ITabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary";
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  isColorless?: boolean;
}

const TabButton: FC<ITabButtonProps> = ({
  children,
  className,
  color,
  iconLeft: IconLeft,
  iconRight: IconRight,
  isColorless = false,
  ...rest
}) => (
  <button
    type="button"
    className={clsx(
      "tabButton",
      color && `tabButton--${color}`,
      isColorless && `tabButton--colorless`,
      className,
    )}
    {...rest}
  >
    {IconLeft}
    <Heading5 className="tabButton__text">{children}</Heading5>
    {IconRight}
  </button>
);

export default TabButton;
