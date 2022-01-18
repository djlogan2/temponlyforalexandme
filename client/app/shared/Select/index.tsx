import clsx from "clsx";
import { noop } from "lodash";
import React, { FC, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useClickOutside";
import Input from "../Input";
import useStyles from "./styles";

interface ISelectProps {
  options: string[];
  disabled?: boolean;
  onSelect: (item: string) => void;
  className?: string;
}

const Select: FC<ISelectProps> = ({
  options,
  disabled,
  onSelect = noop,
  className,
}) => {
  const [items, setitems] = useState(options);
  const [selected, setSelected] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setShowOptions(false);
  });
  const classes = useStyles();

  return (
    <div className={clsx(classes.container, className)} ref={ref}>
      <Input
        placeholder="Placeholder"
        label="Label"
        name="select"
        onFocus={() => {
          setShowOptions(true);
        }}
        rightIcon={
          <div style={{ width: 16, height: 16, backgroundColor: "red" }} />
        }
        value={selected}
        onChange={noop}
        disabled={disabled}
      />

      {showOptions && (
        <ul className={classes.list}>
          {items.map((item) => (
            <li
              key={item}
              onClick={() => {
                setSelected(item);
                setShowOptions(false);
                onSelect(item);
              }}
              onKeyDown={() => {}}
              className={classes.item}
              role="presentation"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
