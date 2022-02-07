import clsx from "clsx";
import "./index.scss";
import React, { FCICC, TextareaHTMLAttributes } from "react";
import useTranslate from "../../hooks/useTranslate";

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
  const labelText = useTranslate(token);
  const placeholderText = placeHolder && useTranslate(placeHolder);
  const textAreaMsgText = msgText && useTranslate(msgText);

  return (
    <div
      className={clsx(
        "textareaContainer",
        className,
        error && "textareaContainerError",
      )}
    >
      <div className="textareaAreaContainer">
        <label className="textareaLabel" htmlFor={name}>
          {labelText}
          <textarea
            {...rest}
            name={name}
            id={name}
            placeholder={placeHolder && placeholderText}
            className="textarea"
          />
        </label>
      </div>
      {!!msgText && <p className="textareaMsg">{textAreaMsgText}</p>}
    </div>
  );
};

export default TextArea;
