import React, { ButtonHTMLAttributes, FC } from "react";
import "./index.scss";
import clsx from "clsx";
import { Heading5 } from "../../Typographies/Heading5";

interface TabItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const TabItemButton: FC<TabItemButtonProps> = ({
  children,
  className,
  selected,
  ...rest
}) => (
  <button
    type="button"
    className={clsx(
      "tabItemButton pointer",
      selected && `tabItemButton--selected`,
      className,
    )}
    {...rest}
  >
    <Heading5 className="tabItemButton__text">{children}</Heading5>
  </button>
);
