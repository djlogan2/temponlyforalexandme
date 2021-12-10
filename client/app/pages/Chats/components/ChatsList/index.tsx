import React, { FC } from "react";
import ClientChat from "/imports/client/clientchat";
import ClientICCServer from "/imports/client/clienticcserver";
import { ChatRecord } from "/imports/models/chatrecord";

interface IChatsListProps {
  currentChatId: string;
  onChooseChat: (id: string) => void;
  chats: ChatRecord[];
}

const ChatsList: FC<IChatsListProps> = ({
  currentChatId,
  onChooseChat,
  chats,
}) => {
  return (
    <div>
      <button
        onClick={() => {
          ClientChat.create({
            creatorId: ClientICCServer.getUserId()!,
            isolation_group: "test",
            name: `Chat${Math.random()}`,
          });
        }}
      >
        Create chat
      </button>
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => onChooseChat(chat._id!)}
          style={{
            width: "300px",
            height: "50px",
            border: "1px solid black",
            padding: "5px",
            marginBottom: "5px",
            cursor: "pointer",
            background: currentChatId === chat._id ? "#eee" : "",
          }}
        >
          <h3>{chat.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
