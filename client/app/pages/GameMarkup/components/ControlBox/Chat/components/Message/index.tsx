import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";

interface MessageProps extends HTMLAttributes<HTMLLIElement> {
  me?: boolean;
}

export const Message: FC<MessageProps> = ({ me, children, ...rest }) => (
  <li className={clsx("chat__message", me && "chat__message--me")} {...rest}>
    {children}
  </li>
);
