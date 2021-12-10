import React, { FC } from "react";

interface IChatsListProps {
  currentChatId: string;
  onChooseChat: (id: string) => void;
  chats: { id: string; name: string }[];
}

const ChatsList: FC<IChatsListProps> = ({
  currentChatId,
  onChooseChat,
  chats,
}) => {
  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChooseChat(chat.id)}
          style={{
            width: "300px",
            height: "50px",
            border: "1px solid black",
            padding: "5px",
            marginBottom: "5px",
            cursor: "pointer",
            background: currentChatId === chat.id ? "#eee" : "",
          }}
        >
          <h3>{chat.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
