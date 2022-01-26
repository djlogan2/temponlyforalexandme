import { noop } from "lodash";
import React, { FC, FCICC, InputHTMLAttributes, useState } from "react";
import useStyles from "./styles";

interface ISwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Switch: FCICC<ISwitchProps> = ({ name, onChange }) => {
  const classes = useStyles();

  const [isToggled, setIsToggled] = useState(false);
  const onToggleHandler = () => setIsToggled(!isToggled);

  return (
    <label className={classes.toggleSwitch} htmlFor={name}>
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
