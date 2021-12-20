import React, { FC } from "react";
import useEventEmitter from "/client/data/hooks/useEventEmitter";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientChat from "/zold/client/clientchat";
import ClientICCServer from "/zold/client/clienticcserver";
import { ChatRecord } from "/zold/models/chatrecord";
import { History } from "history";

interface IChatsListProps {
  currentChatId: string;
  history: History;
  unreadMessages: { [key: string]: number };
}

const useEventEmitterProps = {
  event: EEmitterEvents.CHAT_CHANGE,
  tracker: () => ClientChat.subscribe(),
  shouldTrackerUnmount: true,
};

const ChatsList: FC<IChatsListProps> = ({
  currentChatId,
  history,
  unreadMessages,
}) => {
  const { data } = useEventEmitter<{
    isReady: boolean;
    chats: ChatRecord[];
  }>(useEventEmitterProps);

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <button
        onClick={() => {
          ClientChat.create({
            creatorId: ClientICCServer.getUserId()!,
            isolation_group: "test",
            name: `Chat-${Math.ceil(Math.random() * 10000)}`,
          });
        }}
      >
        Create chat
      </button>
      {data?.chats.map((chat) => {
        const unreadMessagesCount = unreadMessages[chat._id!];

        return (
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>{chat.name}</h3>
            {unreadMessagesCount && (
              <div
                style={{
                  padding: "4px 10px",
                  background: "blue",
                  borderRadius: "50%",
                  fontSize: "16px",
                  color: "#fff",
                }}
              >
                {unreadMessagesCount}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatsList;
