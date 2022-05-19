import clsx from "clsx";
import "./index.scss";
import React, { FC, InputHTMLAttributes, useEffect, useState } from "react";

interface RangeSliderProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number;
  min: number;
  max: number;

  onPickSkill: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

export const RangeSlider: FC<RangeSliderProps> = ({
  className,
  value,
  min = 0,
  max,
  onPickSkill,
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value || min);
  const ratio = (currentValue - min) / (max - min);

  return (
    <div className="rangeSlider">
      <input
        className={clsx("rangeSlider__input", className)}
        type="range"
        onChange={(e) => {
          setCurrentValue(+e.target.value);
          onPickSkill("skill", +e.target.value);
        }}
        min={min}
        max={max}
        value={currentValue}
        {...props}
      />
      <p
        className="rangeSlider__message"
        style={{
          left: `calc(${ratio} * 93.5%)`,
          transform: "translateX(calc(-50% + 1rem))",
        }}
      >
        {min} - {currentValue}
      </p>
    </div>
  );
};
