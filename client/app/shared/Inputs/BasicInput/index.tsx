import { noop } from "lodash";
import React, { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";
import useStyles from "./styles";

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
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(error && classes.formControlError)}>
      <div className={classes.inputContainer}>
        {!!label && (
          <label htmlFor={name} className={classes.label}>
            {label}
          </label>
        )}
        <input {...rest} className={classes.input} name={name} id={name} />
      </div>
      {!!msgText && <p className={classes.msg}>{msgText}</p>}
    </div>
  );
};

export default BasicInput;
