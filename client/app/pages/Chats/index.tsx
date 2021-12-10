import React, { FC } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import ClientMessages from "../../../../imports/client/clientMessages";
import Chat from "./components/Chat";
import ChatForm from "./components/ChatForm";
import ChatsList from "./components/ChatsList";
import ClientICCServer from "/imports/client/clienticcserver";
import { MessageRecord } from "/imports/models/messagerecord";

const Chats: FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams<{ id: string }>();

  const sendMessage = (content: string) => {
    const msg: MessageRecord = {
      content,
      creatorId: ClientICCServer.getUserId()!,
      chatId: id,
    };

    ClientMessages.create(msg);
  };

  return (
    <div style={{ display: "flex" }}>
      <ChatsList currentChatId={id} history={history} />

      {id && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Chat chatId={id} />
          <ChatForm sendMessage={sendMessage} />
        </div>
      )}
    </div>
  );
};

export default Chats;
