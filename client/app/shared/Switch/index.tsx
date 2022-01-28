import React, { FCICC, InputHTMLAttributes, useState } from "react";
import { useAppSelector } from "../../store/hooks";

interface ISwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Switch: FCICC<ISwitchProps> = ({ name, onChange }) => {
  const classes = useAppSelector((state) => {
    const { switchToggle, switch: switchCircle } = state.theming.classes;

    return { switchToggle, switchCircle };
  });

  const [isToggled, setIsToggled] = useState(false);
  const onToggleHandler = () => setIsToggled(!isToggled);

  return (
    <label className={classes.switchToggle} htmlFor={name}>
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
      <span className={classes.switchCircle} />
    </label>
  );
};

export default Switch;
