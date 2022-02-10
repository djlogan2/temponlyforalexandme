import { Mongo } from "meteor/mongo";
import Stoppable from "/lib/Stoppable";
import { CollectionNames } from "/lib/CollectionNames";

export default abstract class MongoCollection<T> extends Stoppable {
  protected readonly mongocollection: Mongo.Collection<T>;

  protected readonly collection: CollectionNames;

  // protected get collection(): CollectionNames {
  //   return this.mongocollection.rawCollection().collectionName as CollectionNames;
  // }

  constructor(collection: CollectionNames, parent: Stoppable | null) {
    super(parent);
    this.collection = collection;

    if (!globalThis.ICCServer.collections[collection]) {
      globalThis.ICCServer.collections[collection] = new Mongo.Collection<T>(
        collection,
      );
    }
    this.mongocollection = globalThis.ICCServer.collections[
      collection
    ] as Mongo.Collection<T>;
  }
}
