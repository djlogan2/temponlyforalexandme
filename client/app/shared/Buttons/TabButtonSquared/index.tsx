import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";
import clsx from "clsx";
import Heading5 from "../../Typographies/Heading5";

interface ITabButtonSquaredProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary";
}

const TabButtonSquared: FC<ITabButtonSquaredProps> = ({
  children,
  className,
  color,
  ...rest
}) => (
  <button
    type="button"
    className={clsx(
      "tabButtonSquared",
      color && `tabButtonSquared--${color}`,
      className,
    )}
    {...rest}
  >
    <Heading5>{children}</Heading5>
  </button>
);

export default TabButtonSquared;
