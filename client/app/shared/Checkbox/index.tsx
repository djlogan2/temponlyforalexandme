import clsx from "clsx";
import React, { FC, InputHTMLAttributes, useState } from "react";

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  disabled?: boolean;
  circled?: boolean;
  className?: string;
}

const Checkbox: FC<ICheckboxProps> = ({
  name,
  className,
  children,
  circled,
  disabled,
  onChange,
  ...rest
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label
      htmlFor={name}
      className={clsx(
        className,
        "checkboxLabel",
        circled && "checkboxCircled",
        disabled && "checkboxDisabled",
      )}
    >
      <input
        {...rest}
        className="checkboxNative"
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
      />
      <svg
        className={clsx("checkbox", isChecked && "checkboxActive")}
        aria-hidden="true"
        viewBox="-3 0 18  9"
        fill="none"
      >
        {!circled && (
          <path
            d="M9.0798 0.658614C9.58685 0.100859 10.45 0.0597543 11.0078 0.566805C11.5656 1.07386 11.6067 1.93705 11.0996 2.49481L5.86647 8.25127C5.61539 8.52744 5.26217 8.68875 4.88903 8.69763C4.51589 8.70651 4.15539 8.56219 3.89147 8.29826L0.94489 5.35169C0.411884 4.81868 0.411884 3.95451 0.94489 3.4215C1.4779 2.88849 2.34207 2.88849 2.87508 3.4215L4.2697 4.81612C4.56358 5.11001 5.04346 5.09859 5.32303 4.79106L9.0798 0.658614Z"
            fill="white"
            stroke={isChecked ? "#fff" : "none"}
          />
        )}
      </svg>
    </label>
  );
};

export default Checkbox;
