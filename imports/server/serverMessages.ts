import { MessageRecord } from '/imports/models/messagerecord';
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import ServerICCServer from "./servericcserver";
import CommonMessages from "../commonmessages";

declare const ICCServer: ServerICCServer;

export default class ServerMessages extends CommonMessages {
  public static sendMessage (message: MessageRecord): void {
    ICCServer.collections.messages?.insert(message);
  };
}

Meteor.methods({
  sendMessage: ServerMessages.sendMessage,
});

Meteor.publish("messages", (chatId) => {
  check(chatId, String);

  return ICCServer.collections.messages?.find({ chatId });
});
