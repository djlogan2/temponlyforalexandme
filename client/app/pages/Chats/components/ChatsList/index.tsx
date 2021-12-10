import React, { FC } from "react";
import useEventEmitter from "/client/data/hooks/useEventEmitter";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientChat from "/imports/client/clientchat";
import ClientICCServer from "/imports/client/clienticcserver";
import { ChatRecord } from "/imports/models/chatrecord";
import { History } from "history";

interface IChatsListProps {
  currentChatId: string;
  history: History;
}

const useEventEmitterProps = {
  event: EEmitterEvents.CHAT_CHANGE,
  tracker: () => ClientChat.subscribe(),
  shouldTrackerUnmount: true,
};

const ChatsList: FC<IChatsListProps> = ({ currentChatId, history }) => {
  const { data } = useEventEmitter<{
    isReady: boolean;
    chats: ChatRecord[];
  }>(useEventEmitterProps);

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
      {data?.chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => history.push(`/chats/${chat._id!}`)}
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
