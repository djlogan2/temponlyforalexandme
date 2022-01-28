import React, { FC, InputHTMLAttributes, useState } from "react";
import { useAppSelector } from "../../store/hooks";

interface ISwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Switch: FC<ISwitchProps> = ({ name, onChange }) => {
  const classes = useAppSelector((state) => state.theming.classes);

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
      <span className={classes.switch} />
    </label>
  );
};

export default Switch;
