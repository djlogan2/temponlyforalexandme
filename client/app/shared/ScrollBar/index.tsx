import clsx from "clsx";
import React, { FC } from "react";
import { ScrollbarProps, Scrollbars } from "react-custom-scrollbars";
import "./index.scss";

interface ScrollBarProps extends ScrollbarProps {
  className?: string;
  thumbVerticalClassName?: string;
  trackVerticalClassName?: string;
}

export const ScrollBar: FC<ScrollBarProps> = ({
  children,
  className,
  thumbVerticalClassName,
  trackVerticalClassName,
  ...rest
}) => (
  <Scrollbars
    hideTracksWhenNotNeeded
    className={clsx("scrollBar", className)}
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
