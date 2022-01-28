import { noop } from "lodash";
import React, { FC, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import AttentionIcon from "../../components/icons/Attention";
import Eye2Icon from "../../components/icons/Eye2";
import { useAppSelector } from "../../store/hooks";

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
        {!!label && (
          <label htmlFor={name} className={classes.inputLabel}>
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
      {!!msgText && <p className={classes.inputMsg}>{msgText}</p>}
    </div>
  );
};

export default Input;
