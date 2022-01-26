import clsx from "clsx";
import React, { FC, FCICC, TextareaHTMLAttributes } from "react";
import useStyles from "./styles";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  msgText?: { token: string; args: string[] };
  placeHolder?: { token: string; args: string[] };
  error?: boolean;
  className?: string;
}

const TextArea: FCICC<ITextAreaProps> = ({
  name,
  className,
  token,
  placeHolder,
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
          {window.i18n.translate(token.token, ...token.args)}
          <textarea
            {...rest}
            name={name}
            id={name}
            placeholder={
              placeHolder &&
              window.i18n.translate(placeHolder.token, ...placeHolder.args)
            }
            className={classes.textarea}
          />
        </label>
      </div>
      {!!msgText && (
        <p className={classes.msg}>
          {window.i18n.translate(msgText.token, ...msgText.args)}
        </p>
      )}
    </div>
  );
};

export default TextArea;
