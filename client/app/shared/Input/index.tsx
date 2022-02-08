import { noop } from "lodash";
import React, { FC, FCICC, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import AttentionIcon from "../../components/icons/Attention";
import Eye2Icon from "../../components/icons/Eye2";
import useTranslate from "../../hooks/useTranslate";
import "./index.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: boolean;
  msgText?: { token: string; args: string[] };
  rightIcon?: JSX.Element;
  className?: string;
  onIconClick?: () => void;
}

const Input: FCICC<IInputProps> = ({
  name,
  type,
  token,
  msgText,
  error,
  className,
  rightIcon: Icon,
  onIconClick = noop,
  ...rest
}) => {
  const [inputType, setInputType] = useState(type || "text");
  const labelText = useTranslate(token);
  const inputMsgText = msgText && useTranslate(msgText);

  return (
    <div
      className={clsx(
        className,
        "inputFormControl",
        error && "inputFormControlError",
      )}
    >
      <div className="inputContainer">
        {!!token && (
          <label htmlFor={name} className="inputLabel">
            {labelText}
          </label>
        )}
        <div className="inputWithIcon">
          <input
            {...rest}
            className="input"
            name={name}
            id={name}
            type={inputType}
          />
          {!!Icon && (
            <div
              className="inputIcon"
              onClick={onIconClick}
              onKeyDown={() => {}}
              role="presentation"
            >
              {Icon}
            </div>
          )}

          {error && <AttentionIcon color="red" />}

          {!Icon && type === "password" && (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                onIconClick();
                setInputType(inputType === "password" ? "text" : "password");
              }}
              role="presentation"
            >
              <Eye2Icon />
            </span>
          )}
        </div>
      </div>
      {!!msgText && <p className="inputMsg">{inputMsgText}</p>}
    </div>
  );
};

export default Input;
