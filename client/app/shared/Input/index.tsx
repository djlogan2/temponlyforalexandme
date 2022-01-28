import { noop } from "lodash";
import React, { FC, FCICC, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import AttentionIcon from "../../components/icons/Attention";
import Eye2Icon from "../../components/icons/Eye2";
import { useAppSelector } from "../../store/hooks";

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
  const classes = useAppSelector((state) => state.theming.classes);
  const [inputType, setInputType] = useState(type || "text");

  return (
    <div
      className={clsx(
        className,
        classes.inputFormControl,
        error && classes.inputFormControlError,
      )}
    >
      <div className={classes.inputContainer}>
        {!!token && (
          <label htmlFor={name} className={classes.inputLabel}>
            {window.i18n.translate(token.token, ...token.args)}
          </label>
        )}
        <div className={classes.inputWithIcon}>
          <input
            {...rest}
            className={classes.input}
            name={name}
            id={name}
            type={inputType}
          />
          {!!Icon && (
            <div
              className={classes.inputIcon}
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
      {!!msgText && (
        <p className={classes.inputMsg}>
          {window.i18n.translate(msgText.token, ...msgText.args)}
        </p>
      )}
    </div>
  );
};

export default Input;
