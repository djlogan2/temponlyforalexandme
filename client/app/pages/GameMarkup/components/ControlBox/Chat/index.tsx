import React, { FC } from "react";
import { InputMessage } from "./components/InputMessage";
import { Messages } from "./components/Messages";
import "./index.scss";

interface ChatProps {
  messages: { id: string; me?: boolean; text: string }[];
}

export const Chat: FC<ChatProps> = ({ messages }) => (
  <div className="chat">
    <Messages messages={messages} />
    <InputMessage />
  </div>
);
