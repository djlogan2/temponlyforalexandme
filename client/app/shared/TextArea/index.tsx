import clsx from "clsx";
import React, { FCICC, TextareaHTMLAttributes } from "react";
import useTranslate from "../../hooks/useTranslate";
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
  const labelText = useTranslate(token);
  const placeholderText = placeHolder && useTranslate(placeHolder);
  const textAreaMsgText = msgText && useTranslate(msgText);

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
          {labelText}
          <textarea
            {...rest}
            name={name}
            id={name}
            placeholder={placeHolder && placeholderText}
            className={classes.textarea}
          />
        </label>
      </div>
      {!!msgText && <p className={classes.textareaMsg}>{textAreaMsgText}</p>}
    </div>
  );
};

export default TextArea;
