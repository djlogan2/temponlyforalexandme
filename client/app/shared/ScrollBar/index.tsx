import clsx from "clsx";
import React, { FC } from "react";
import { ScrollbarProps, Scrollbars } from "react-custom-scrollbars";
import "./index.scss";

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
}) => (
  <Scrollbars
    hideTracksWhenNotNeeded
    className={clsx("scrollBar")}
    renderThumbVertical={(props) => (
      <div
        {...props}
        className={clsx("scrollBarThumbVertical", thumbVerticalClassName)}
      />
    )}
    renderTrackVertical={(props) => (
      <div
        {...props}
        className={clsx("scrollBarTrackVertical", trackVerticalClassName)}
      />
    )}
    {...rest}
  >
    {children}
  </Scrollbars>
);

export default ScrollBar;
