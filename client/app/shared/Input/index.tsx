/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";
import { noop } from "lodash";
import React, { FC, InputHTMLAttributes } from "react";
import SmallText from "../Typographies/SmallText";
import "./index.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: boolean;
  errorText?: string;
  icon?: JSX.Element;
  onContainerClick?: () => void;
}

const Input: FC<IInputProps> = ({
  label,
  name,
  className,
  disabled,
  errorText,
  error,
  icon,
  onContainerClick = noop,
  ...rest
}) => (
  <div onClick={onContainerClick}>
    <label
      className={clsx(
        "inputField",
        error && "inputField--error",
        !icon && "inputField--noIcon",
        className,
      )}
      data-disabled={disabled}
      htmlFor={name}
    >
      {label}
      <input
        className="inputField__input"
        name={name}
        disabled={disabled}
        {...rest}
      />
      {icon}
    </label>
    {error && (
      <SmallText className="inputField__errorText">{errorText}</SmallText>
    )}
  </div>
);

export default Input;
