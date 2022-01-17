import { noop } from "lodash";
import React, { FC, InputHTMLAttributes, useState } from "react";
import "../../../../stylesheets/BasicInput/index.scss";
import clsx from "clsx";

interface IBasicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: boolean;
  msgText?: string;
}

const BasicInput: FC<IBasicInputProps> = ({
  name,
  label,
  msgText,
  error,
  onFocus = noop,
  onBlur = noop,
  ...rest
}) => (
  <div className={clsx("formControl", error && "formControl--error")}>
    <div className="formControl__inputContainer">
      {!!label && (
        <label htmlFor={name} className="formControl__label">
          {label}
        </label>
      )}
      <input {...rest} className="formControl__input" name={name} id={name} />
    </div>
    {!!msgText && <div className="formControl__msg">{msgText}</div>}
  </div>
);

export default BasicInput;
