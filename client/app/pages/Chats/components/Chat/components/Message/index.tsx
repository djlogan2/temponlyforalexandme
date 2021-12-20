import React, { FC, useEffect, useRef } from "react";
import ClientICCServer from "/zold/client/clienticcserver";
import VisibilitySensor from "react-visibility-sensor";

interface IMessageProps {
  message: string;
  from: string;
  scrollToMe: boolean;
  read: boolean;
  id: string;
  creatorId: string;
  onChange: (id: string, creatorId: string) => void;
}

const Message: FC<IMessageProps> = ({
  message,
  from,
  scrollToMe,
  read,
  id,
  creatorId,
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMyMessage = from === ClientICCServer.getUserId()!;

  useEffect(() => {
    if (scrollToMe && ref.current && !isMyMessage) {
      ref.current.scrollIntoView();
    }
  }, [scrollToMe, ref]);

  return (
    <VisibilitySensor
      onChange={(visible) => visible && onChange(id, creatorId)}
      active={!read}
    >
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
    </VisibilitySensor>
  );
};

export default Message;
