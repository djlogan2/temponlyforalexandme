import React, { FC } from "react";
import { Message } from "../Message";
import { ScrollBar } from "/client/app/shared/ScrollBar";

type MessagesProps = {
  messages: { id: string; me?: boolean; text: string }[];
};

export const Messages: FC<MessagesProps> = ({ messages }) => (
  <div className="chat__messages">
    <ScrollBar>
      <ul className="chat__list">
        {messages.map((msg) => (
          <Message key={msg.id} me={!!msg.me}>
            {msg.text}
          </Message>
        ))}
      </ul>
    </ScrollBar>
  </div>
);
