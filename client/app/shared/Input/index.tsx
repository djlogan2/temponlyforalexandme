import { noop } from "lodash";
import React, { FC, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import useStyles from "./styles";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: boolean;
  msgText?: string;
  rightIcon?: JSX.Element;
  className?: string;
  onIconClick?: () => void;
}

const Input: FC<IInputProps> = ({
  name,
  label,
  type,
  msgText,
  error,
  className,
  rightIcon: Icon,
  onIconClick = noop,
  ...rest
}) => {
  const classes = useStyles();
  const [inputType, setInputType] = useState(type || "text");

  return (
    <div
      className={clsx(
        className,
        classes.formControl,
        error && classes.formControlError,
      )}
    >
      <div className={classes.inputContainer}>
        {!!label && (
          <label htmlFor={name} className={classes.label}>
            {label}
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
              className={classes.icon}
              onClick={onIconClick}
              onKeyDown={() => {}}
              role="presentation"
            >
              {Icon}
            </div>
          )}

          {!Icon && type === "password" && (
            <div
              style={{ width: 16, height: 16, backgroundColor: "red" }}
              onClick={() => {
                onIconClick();
                setInputType(inputType === "password" ? "text" : "password");
              }}
              role="presentation"
            />
          )}
        </div>
      </div>
      {!!msgText && <p className={classes.msg}>{msgText}</p>}
    </div>
  );
};

export default Input;
