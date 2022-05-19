/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from "clsx";
import React, { FC, useState } from "react";
import { Chevron } from "/client/app/components/icons/Chevron";
import { Paragraph } from "/client/app/shared/Typographies/Paragraph";

type AccordeonProps = {
  title: string;
  className?: string;
  children?: React.ReactNode;
};

export const Accordeon: FC<AccordeonProps> = ({
  children,
  title,
  className,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={clsx("boardSetupTab__accordeon", className)}>
      <div
        className="boardSetupTab__accordeon-header pointer"
        onClick={() => setShow((prev) => !prev)}
      >
        <Paragraph>{title}</Paragraph>
        <Chevron
          className={clsx(
            "boardSetupTab__chevronIcon",
            show && "boardSetupTab__chevronIconUp",
          )}
        />
      </div>
      {show && children && (
        <div className={clsx("boardSetupTab__content")}>{children}</div>
      )}
    </div>
  );
};
