import React, { FC } from "react";
import Message from "../Message";
import ScrollBar from "/client/app/shared/ScrollBar";

interface IMessagesProps {
  messages: { id: string; me?: boolean; text: string }[];
}

const Messages: FC<IMessagesProps> = ({ messages }) => (
  <div className="chat__messages">
    <ScrollBar>
      <ul className="chat__list">
        <Message me>I am a message!</Message>
        <Message>Not me!</Message>
        {messages.map((msg) => (
          <Message key={msg.id} me={!!msg.me}>
            {msg.text}
          </Message>
        ))}
      </ul>
    </ScrollBar>
  </div>
);

export default Messages;
