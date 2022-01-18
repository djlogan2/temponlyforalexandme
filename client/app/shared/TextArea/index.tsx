import clsx from "clsx";
import React, { FC, TextareaHTMLAttributes } from "react";
import useStyles from "./styles";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  msgText?: string;
  error?: boolean;
  className?: string;
}

const TextArea: FC<ITextAreaProps> = ({
  name,
  className,
  msgText,
  error,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.container,
        className,
        error && classes.containerError,
      )}
    >
      <div className={classes.areaContainer}>
        <label className={classes.label} htmlFor={name}>
          Label
          <textarea
            {...rest}
            name={name}
            id={name}
            placeholder="Placeholder"
            className={classes.textarea}
          />
        </label>
      </div>
      {!!msgText && <p className={classes.msg}>{msgText}</p>}
    </div>
  );
};

export default TextArea;
