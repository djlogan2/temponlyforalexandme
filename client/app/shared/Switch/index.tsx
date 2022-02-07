import React, { FCICC, InputHTMLAttributes, useState } from "react";
import "./index.scss";

interface ISwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Switch: FCICC<ISwitchProps> = ({ name, onChange }) => {
  const [isToggled, setIsToggled] = useState(false);
  const onToggleHandler = () => setIsToggled(!isToggled);

  return (
    <label className="switchToggle" htmlFor={name}>
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
    </label>
  );
};

export default Switch;
