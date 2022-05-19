import clsx from "clsx";
import "./index.scss";
import React, { FCICC, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  msgText?: { token: string; args: string[] };
  placeHolder?: { token: string; args: string[] };
  error?: boolean;
  className?: string;
}

export const TextArea: FCICC<TextAreaProps> = ({
  name,
  className,
  token,
  placeHolder,
  msgText,
  error,
  ...rest
}) => (
  <div
    className={clsx(
      "textareaContainer",
      className,
      error && "textareaContainerError",
    )}
  >
    <div className="textareaAreaContainer">
      <label className="textareaLabel" htmlFor={name}>
        {token.token}
        <textarea
          {...rest}
          name={name}
          id={name}
          placeholder={placeHolder && placeHolder.token}
          className="textarea"
        />
      </label>
    </div>
    {!!msgText && <p className="textareaMsg">{msgText.token}</p>}
  </div>
);
