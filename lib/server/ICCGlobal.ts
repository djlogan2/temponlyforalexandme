import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import Stoppable from "/lib/Stoppable";
import ServerLogger from "/lib/server/ServerLogger";
import CommonLogger from "/lib/logger/CommonLogger";
import { CollectionNames } from "/lib/CollectionNames";

globalThis.ICCServer = {
  connections: {},
  collections: {},
  games: {},
  services: {},
  utilities: {
    getLogger: (parent: Stoppable, identifier: string) =>
      new ServerLogger(parent, identifier) as CommonLogger,
    getCollection(collectionname: CollectionNames): Mongo.Collection<any> {
      if (!globalThis.ICCServer.collections[collectionname])
        throw new Meteor.Error("MISSING_COLLECTION");
      return globalThis.ICCServer.collections[
        collectionname
      ] as Mongo.Collection<any>;
    },
  },
};
