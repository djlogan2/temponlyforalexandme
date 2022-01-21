import { Mongo } from "meteor/mongo";
import Stoppable from "/lib/Stoppable";
import { CollectionNames } from "/lib/CollectionNames";

export default abstract class MongoCollection<T> extends Stoppable {
  protected mongocollection: Mongo.Collection<T>;

  constructor(collection: CollectionNames, parent: Stoppable | null) {
    super(parent);
    if (!globalThis.ICCServer.collections[collection]) {
      globalThis.ICCServer.collections[collection] = new Mongo.Collection<T>(
        collection,
      );
    }
    this.mongocollection = globalThis.ICCServer.collections[
      collection
    ] as Mongo.Collection<T>;
  }

  public get isempty(): boolean {
    return !this.mongocollection.find({}).count();
  }
}
