import clsx from "clsx";
import React, { FC, InputHTMLAttributes } from "react";
import Copy from "../../components/icons/Copy";
import SmallText from "../Typographies/SmallText";
import "./index.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: boolean;
  errorText?: string;
  icon?: JSX.Element;
}

const Input: FC<IInputProps> = ({
  label,
  name,
  className,
  disabled,
  errorText,
  error,
  icon,
  ...rest
}) => (
  <div>
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
