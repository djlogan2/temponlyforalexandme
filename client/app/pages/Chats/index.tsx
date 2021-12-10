import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import Chat from "./components/Chat";
import ChatsList from "./components/ChatsList";
import useEventEmitter from "/client/data/hooks/useEventEmitter";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientChat from "../../../../imports/client/clientchat";
import { ChatRecord } from "/imports/models/chatrecord";

const chats = new Array(10).fill(0).map((_, i) => ({
  id: `${i}`,
  name: `Chat-${i}`,
}));

const messages = new Array(10).fill(0).map((_, i) => ({
  id: `${i}`,
  message: `Msg ${i}`,
  from: `${i % 2}`,
  createdAt: new Date().toISOString(),
}));

const Chats: FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams<{ id: string }>();
  const { data } = useEventEmitter<{ isReady: boolean; chats: ChatRecord[] }>({
    event: EEmitterEvents.CHAT_CHANGE,
    tracker: () => ClientChat.subscribe(id),
    shouldTrackerUnmount: true,
  });

  const [selectedChat, setSelectedChat] =
    useState<{ id: string; name: string }>();

  useEffect(() => {
    // make a call to fetch chat
    const chat = chats.find((chat) => chat.id === id);
    setSelectedChat(chat);
  }, [data]);

  const onChooseChat = (id: string) => {
    history.push(`/chats/${id}`);
  };

  return (
    <div style={{ display: "flex" }}>
      {data?.chats.length && (
        <ChatsList
          currentChatId={id}
          onChooseChat={onChooseChat}
          chats={data.chats}
        />
      )}
      {selectedChat && <Chat messages={messages} />}
    </div>
  );
};

export default Chats;
