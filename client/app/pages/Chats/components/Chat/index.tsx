import React, { FC, useEffect, useMemo } from "react";
import Message from "./components/Message";
import useEventEmitter from "/client/data/hooks/useEventEmitter";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientMessages from "/imports/client/clientMessages";
import { MessageRecord } from "/imports/models/messagerecord";

interface IChatProps {
  chatId: string;
}

const Chat: FC<IChatProps> = ({ chatId }) => {
  const useEventEmitterProps = useMemo(() => {
    return {
      event: EEmitterEvents.MESSAGES_FETCH,
      tracker: () => ClientMessages.subscribe(chatId),
      shouldTrackerUnmount: true,
    };
  }, [chatId]);

  const { data } = useEventEmitter<{
    isReady: Boolean;
    messages: MessageRecord[];
  }>(useEventEmitterProps);

  useEffect(() => {
    const msgs = ClientMessages.getMessages(chatId);
    console.log(msgs);
  }, [chatId]);

  return (
    <div
      style={{
        height: "90vh",
        padding: "10px",
        marginLeft: "5px",
        width: "100%",
      }}
    >
      {data?.messages.map((msg) => (
        <Message key={msg._id} message={msg.content} from={msg.creatorId} />
      ))}
    </div>
  );
};

export default Chat;
