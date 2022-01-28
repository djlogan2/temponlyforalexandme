import clsx from "clsx";
import { noop } from "lodash";
import React, { FC, FCICC, useRef, useState } from "react";
import Chevron from "../../components/icons/Chevron";
import useOnClickOutside from "../../hooks/useClickOutside";
import { useAppSelector } from "../../store/hooks";
import Input from "../Input";

interface ISelectProps {
  options: string[];
  disabled?: boolean;
  onSelect: (item: string) => void;
  className?: string;
  placeHolder: { token: string; args: string[] };
}

const Select: FCICC<ISelectProps> = ({
  token,
  placeHolder,
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
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div className={clsx(classes.selectContainer, className)} ref={ref}>
      <Input
        placeholder={window.i18n.translate(
          placeHolder.token,
          ...placeHolder.args,
        )}
        token={token}
        name="select"
        onFocus={() => {
          setShowOptions(true);
        }}
        rightIcon={
          <span
            onClick={() => setShowOptions((val) => !val)}
            role="presentation"
          >
            <Chevron color={showOptions ? "#0F5AB6" : "#000"} />
          </span>
        }
        value={selected}
        onChange={noop}
        disabled={disabled}
        keyboardFunctions={[]}
        classes={[]}
      />

      {showOptions && (
        <ul className={classes.selectList}>
          {items.map((item) => (
            <li
              key={item}
              onClick={() => {
                setSelected(item);
                setShowOptions(false);
                onSelect(item);
              }}
              onKeyDown={() => {}}
              className={classes.selectItem}
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