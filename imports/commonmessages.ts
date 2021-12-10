import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import CommonICCServer from "./commoniccserver";

declare const ICCServer: CommonICCServer;

export default abstract class CommonMessages {}

Meteor.startup(() => {
  if (!ICCServer.collections.messages) {
    ICCServer.collections.messages = new Mongo.Collection("messages");
  }
});
