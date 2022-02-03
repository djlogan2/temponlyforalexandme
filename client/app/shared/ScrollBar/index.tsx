import clsx from "clsx";
import React, { FC } from "react";
import { ScrollbarProps, Scrollbars } from "react-custom-scrollbars";
import { useAppSelector } from "../../store/hooks";

interface IScrollBarProps extends ScrollbarProps {
  className?: string;
  thumbVerticalClassName?: string;
  trackVerticalClassName?: string;
}

const ScrollBar: FC<IScrollBarProps> = ({
  children,
  className,
  thumbVerticalClassName,
  trackVerticalClassName,
  ...rest
}) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <Scrollbars
      autoHeight
      className={clsx(classes.scrollBar)}
      renderThumbVertical={(props) => (
        <div
          {...props}
          className={clsx(
            classes.scrollBarThumbVertical,
            thumbVerticalClassName,
          )}
        />
      )}
      renderTrackVertical={(props) => (
        <div
          {...props}
          className={clsx(
            classes.scrollBarTrackVertical,
            trackVerticalClassName,
          )}
        />
      )}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

export default ScrollBar;
