import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import ServerICCServer from "./servericcserver";
import CommonChat from "../commonchat";

declare const ICCServer: ServerICCServer;

export default class ServerChat extends CommonChat {}

Meteor.publish("chat", (chatId) => {
  check(chatId, String);

  return ICCServer.collections.chat?.find();
});
