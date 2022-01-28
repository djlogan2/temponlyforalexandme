import clsx from "clsx";
import React, { FCICC, TextareaHTMLAttributes } from "react";
import { useAppSelector } from "../../store/hooks";

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
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div
      className={clsx(
        classes.textareaContainer,
        className,
        error && classes.textareaContainerError,
      )}
    >
      <div className={classes.textareaAreaContainer}>
        <label className={classes.textareaLabel} htmlFor={name}>
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
        <p className={classes.textareaMsg}>
          {window.i18n.translate(msgText.token, ...msgText.args)}
        </p>
      )}
    </div>
  );
};

export default TextArea;
