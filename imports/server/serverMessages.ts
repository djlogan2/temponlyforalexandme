import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import ServerICCServer from "./servericcserver";
import CommonMessages from "../commonmessages";

declare const ICCServer: ServerICCServer;

export default class ServerMessages extends CommonMessages {}

Meteor.publish("messages", (chatId) => {
  check(chatId, String);

  return ICCServer.collections.messages?.find({ chatId });
});
