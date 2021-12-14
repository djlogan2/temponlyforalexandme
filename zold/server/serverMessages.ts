import { Meteor } from "meteor/meteor";
import CommonMessages from "../commonmessages";
import ServerICCServer from "../../imports/server/servericcserver";
import { MessageRecord } from "/imports/models/messagerecord";

declare const ICCServer: ServerICCServer;

export default class ServerMessages extends CommonMessages {
  public static sendMessage(message: MessageRecord): void {
    ICCServer.collections.messages?.insert(message);
  }

  public static setMessagedRead(messagesIds: string[]) {
    messagesIds.forEach((id) => {
      ICCServer?.collections?.messages?.update(
        { _id: id },
        { $set: { read: true } },
        { upsert: true },
      );
    });
  }
}

Meteor.methods({
  sendMessage: ServerMessages.sendMessage,
  setMessagedRead: ServerMessages.setMessagedRead,
});

Meteor.publish("messages", () => {
  return ICCServer.collections.messages?.find();
});
