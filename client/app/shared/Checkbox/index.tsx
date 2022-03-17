import clsx from "clsx";
import React, { FC, InputHTMLAttributes, useState } from "react";
import Check from "../../components/icons/Check";

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  disabled?: boolean;
  circled?: boolean;
  className?: string;
  text?: string;
}

const Checkbox: FC<ICheckboxProps> = ({
  name,
  className,
  children,
  circled,
  disabled,
  text,
  onChange,
  ...rest
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label htmlFor={name} className="d-flex align-items-center">
      <div
        className={clsx(
          "checkbox pointer",
          `checkbox--${circled ? "circled" : "regular"}`,
          isChecked && "checkbox--checked",
          disabled && "checkbox--disabled",
          className,
        )}
      >
        {!circled && isChecked && <Check />}
      </div>

      {text && <span className="checkbox__text">{text}</span>}

      <input
        hidden
        type="checkbox"
        name={name}
        id={name}
        onChange={(data) => {
          setIsChecked(!isChecked);
          if (onChange) {
            onChange(data);
          }
        }}
        disabled={disabled}
        {...rest}
      />
    </label>
  );
};

export default Checkbox;
