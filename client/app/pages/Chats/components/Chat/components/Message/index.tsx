import React, { FC, useEffect, useRef } from "react";
import ClientICCServer from "/imports/client/clienticcserver";

interface IMessageProps {
  message: string;
  from: string;
  scrollToMe: boolean;
}

const Message: FC<IMessageProps> = ({ message, from, scrollToMe }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMyMessage = from === ClientICCServer.getUserId()!;

  useEffect(() => {
    if (scrollToMe && ref.current && !isMyMessage) {
      ref.current.scrollIntoView();
    }
  }, [scrollToMe, ref]);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: isMyMessage ? "brown" : "green",
        color: "#fff",
        width: "max-content",
        padding: "5px",
        borderRadius: "5px",
        fontSize: "22px",
        marginLeft: isMyMessage ? "auto" : "",
        marginBottom: "10px",
      }}
    >
      {message}
    </div>
  );
};

export default Message;
