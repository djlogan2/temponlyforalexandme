import clsx from "clsx";
import "./index.scss";
import React, { FC, InputHTMLAttributes, useState } from "react";

interface IRangeSliderProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number;
  min: number;
  max: number;
}

const RangeSlider: FC<IRangeSliderProps> = ({
  className,
  value,
  min = 0,
  max,
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value || min);
  const ratio = (currentValue - min) / (max - min);

  return (
    <div className="rangeSlider">
      <input
        className={clsx("rangeSlider__input", className)}
        type="range"
        onChange={(e) => setCurrentValue(+e.target.value)}
        min={min}
        max={max}
        value={currentValue}
        {...props}
      />
      <p
        className="rangeSlider__message"
        style={{
          left: `calc(${ratio} * 93.5%)`,
          // left: "100%",
          transform: "translateX(calc(-50% + 1rem))",
        }}
      >
        {min} - {currentValue}
      </p>
    </div>
  );
};

export default RangeSlider;
