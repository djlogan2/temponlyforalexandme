import React, { FC } from "react";
import ClientICCServer from "/imports/client/clienticcserver";

interface IMessageProps {
  message: string;
  from: string;
}

const Message: FC<IMessageProps> = ({ message, from }) => {
  const isMyMessage = from === ClientICCServer.getUserId()!;
  return (
    <div
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
