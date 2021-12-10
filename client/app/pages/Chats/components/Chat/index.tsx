import React, { FC, useState } from "react";
import ChatForm, { IMessage } from "./components/ChatForm";
import Message from "./components/Message";

interface IChatProps {
  messages: IMessage[];
}

const Chat: FC<IChatProps> = ({ messages }) => {
  const [msgs, setMsgs] = useState(messages);

  const sendMessage = (msg: IMessage) => {
    const newMessages = [...msgs, msg];
    setMsgs(newMessages);
  };

  return (
    <div style={{ width: "100%", marginLeft: "5px" }}>
      <div style={{ height: "90vh", backgroundColor: "#000", padding: "10px" }}>
        {msgs.map((msg) => (
          <Message key={msg.id} message={msg.message} from={msg.from} />
        ))}
      </div>
      <ChatForm sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
