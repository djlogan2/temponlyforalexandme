import { Meteor } from "meteor/meteor";
import CommonMessages from "../commonmessages";
import ServerICCServer from "./servericcserver";
import { MessageRecord } from "/imports/models/messagerecord";

declare const ICCServer: ServerICCServer;

export default class ServerMessages extends CommonMessages {
  public static sendMessage(message: MessageRecord): void {
    ICCServer.collections.messages?.insert(message);
  }

  public static setMessagedRead(messagesIds: string[]) {
    ICCServer?.collections?.messages?.update(
      { _id: { $in: messagesIds } },
      { $set: { read: true } },
      { multi: true },
    );
  }
}

Meteor.methods({
  sendMessage: ServerMessages.sendMessage,
  setMessagedRead: ServerMessages.setMessagedRead,
});

Meteor.publish("messages", () => {
  return ICCServer.collections.messages?.find();
});
