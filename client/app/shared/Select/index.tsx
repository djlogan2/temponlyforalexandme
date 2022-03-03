import clsx from "clsx";
import { noop } from "lodash";
import React, { FCICC, useRef, useState } from "react";
import Chevron from "../../components/icons/Chevron";
import useOnClickOutside from "../../hooks/useClickOutside";
import useTranslate from "../../hooks/useTranslate";
import "./index.scss";
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
  const placeholderText = useTranslate(placeHolder);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setShowOptions(false);
  });

  return (
    <div className={clsx("selectContainer", className)} ref={ref}>
      <Input
        label=""
        placeholder={placeholderText}
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

export default Select;
