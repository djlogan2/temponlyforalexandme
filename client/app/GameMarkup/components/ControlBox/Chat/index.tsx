import React, { FC } from "react";
import InputMessage from "./components/InputMessage";
import Messages from "./components/Messages";
import "./index.scss";

interface IChatProps {
  messages: { id: string; me?: boolean; text: string }[];
}

const Chat: FC<IChatProps> = ({ messages }) => (
  <div className="chat">
    <Messages messages={messages} />
    <InputMessage />
  </div>
);

export default Chat;
