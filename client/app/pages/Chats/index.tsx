import React, { FC, useRef } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import ClientMessages from "../../../../imports/client/clientMessages";
import Chat from "./components/Chat";
import ChatForm from "./components/ChatForm";
import ChatsList from "./components/ChatsList";
import useEventEmitter from "/client/data/hooks/useEventEmitter";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientICCServer from "/imports/client/clienticcserver";
import { MessageRecord } from "/zold/models/messagerecord";

const useEventEmitterProps = {
  event: EEmitterEvents.MESSAGES_FETCH,
  tracker: () => ClientMessages.subscribe(),
  shouldTrackerUnmount: true,
};

const Chats: FC<RouteComponentProps> = ({ history }) => {
  const { id: currentChatId } = useParams<{ id: string }>();
  const chatRef = useRef<HTMLDivElement>(null);

  const { data } = useEventEmitter<{
    isReady: boolean;
    messagesHash: { [key: string]: MessageRecord[] };
    unreadMessagesHashCounter: { [key: string]: number };
  }>(useEventEmitterProps);

  const sendMessage = (content: string) => {
    const msg: MessageRecord = {
      content,
      creatorId: ClientICCServer.getUserId()!,
      chatId: currentChatId,
      read: false,
    };

    ClientMessages.create(msg);
  };

  return (
    data && (
      <div style={{ display: "flex" }}>
        <div style={{ width: "max-content" }}>
          <ChatsList
            currentChatId={currentChatId}
            history={history}
            unreadMessages={data?.unreadMessagesHashCounter!}
          />
        </div>

        {currentChatId && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              marginLeft: "5px",
              width: "100%",
            }}
          >
            <Chat
              chatRef={chatRef}
              messages={data?.messagesHash[currentChatId] || []}
              currentChatId={currentChatId}
              unreadMessagesCount={
                data?.unreadMessagesHashCounter[currentChatId]
              }
            />
            <ChatForm sendMessage={sendMessage} />
          </div>
        )}
      </div>
    )
  );
};

export default Chats;
