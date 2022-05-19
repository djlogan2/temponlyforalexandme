import clsx from "clsx";
import { noop } from "lodash";
import React, { FCICC, useRef, useState } from "react";
import { Chevron } from "../../components/icons/Chevron";
import { useClickOutside } from "../../hooks";
import "./index.scss";
import { Input } from "../Input";

type SelectProps = {
  options: string[];
  disabled?: boolean;
  onSelect: (item: string) => void;
  className?: string;
  placeHolder: { token: string; args: string[] };
};

export const Select: FCICC<SelectProps> = ({
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
  useClickOutside(ref, () => {
    setShowOptions(false);
  });

  return (
    <div className={clsx("selectContainer", className)} ref={ref}>
      <Input
        label=""
        placeholder={placeHolder.token}
        name="select"
        onFocus={() => {
          setShowOptions(true);
        }}
        icon={
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
      />

      {showOptions && (
        <ul className="selectList">
          {items.map((item) => (
            <li
              key={item}
              onClick={() => {
                setSelected(item);
                setShowOptions(false);
                onSelect(item);
              }}
              onKeyDown={() => {}}
              className="selectItem"
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
