import { Meteor } from "meteor/meteor";
import ServerICCServer from "./servericcserver";
import CommonChat from "../commonchat";

declare const ICCServer: ServerICCServer;

export default class ServerChat extends CommonChat {}

Meteor.publish("chat", () => {
  return ICCServer.collections.chat?.find();
});
