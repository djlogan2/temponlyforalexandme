import React, { FC, InputHTMLAttributes, useState } from "react";
import "./index.scss";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  text?: string;
}

export const Switch: FC<SwitchProps> = ({ name, onChange, text }) => {
  const [isToggled, setIsToggled] = useState(false);
  const onToggleHandler = () => setIsToggled(!isToggled);

  return (
    <label htmlFor={name} className="d-flex align-items-center">
      <div className="switchToggle">
        <input
          name={name}
          id={name}
          type="checkbox"
          checked={isToggled}
          onChange={(data) => {
            onToggleHandler();

            if (onChange) {
              onChange(data);
            }
          }}
        />
        <span className="switch" />
      </div>

      {text && <span className="switch__text">{text}</span>}
    </label>
  );
};
