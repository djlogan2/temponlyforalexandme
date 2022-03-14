import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";

interface IMessageProps extends HTMLAttributes<HTMLLIElement> {
  me?: boolean;
}

const Message: FC<IMessageProps> = ({ me, children, ...rest }) => (
  <li className={clsx("chat__message", me && "chat__message--me")} {...rest}>
    {children}
  </li>
);

export default Message;
