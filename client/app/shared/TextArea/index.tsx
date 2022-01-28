import clsx from "clsx";
import React, { FC, TextareaHTMLAttributes } from "react";
import { useAppSelector } from "../../store/hooks";

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
      {!!msgText && <p className={classes.textareaMsg}>{msgText}</p>}
    </div>
  );
};

export default TextArea;
