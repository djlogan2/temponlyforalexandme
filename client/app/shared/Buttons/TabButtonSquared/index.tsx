import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";
import clsx from "clsx";
import Heading5 from "../../Typographies/Heading5";

interface ITabButtonSquaredProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary";
  iconTop?: JSX.Element;
}

const TabButtonSquared: FC<ITabButtonSquaredProps> = ({
  children,
  className,
  color,
  iconTop: IconTop,
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
    {IconTop}
    <Heading5 className="tabButtonSquared__text">{children}</Heading5>
  </button>
);

export default TabButtonSquared;
