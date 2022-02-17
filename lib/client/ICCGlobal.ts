import Stoppable from "/lib/Stoppable";
import ClientLogger from "/lib/client/ClientLogger";
import CommonLogger from "/lib/CommonLogger";
import { CollectionNames } from "/lib/CollectionNames";
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

globalThis.subscriptions = {};
globalThis.userlist = {};

globalThis.ICCServer = {
  collections: {},
  games: {},
  services: {},
  utilities: {
    getLogger: (parent: Stoppable, identifier: string) =>
      new ClientLogger(parent, identifier) as CommonLogger,
    getCollection(collectionname: CollectionNames): Mongo.Collection<any> {
      if (!globalThis.ICCServer.collections[collectionname])
        throw new Meteor.Error("MISSING_COLLECTION");
      return globalThis.ICCServer.collections[
        collectionname
      ] as Mongo.Collection<any>;
    },
  },
};
