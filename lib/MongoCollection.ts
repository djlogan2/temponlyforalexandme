import { Mongo } from "meteor/mongo";
import Stoppable from "/lib/Stoppable";

export default abstract class MongoCollection<T> extends Stoppable {
    protected mongocollection: Mongo.Collection<T>;

    // @ts-ignore
    // eslint-disable-next-line class-methods-use-this
    protected stopping(): void {
        // I'm not sure there is any good reason to remove a collection from the global collections.
        // If we ever decide there is a good reason, then here is where we would do it. Of course, we would
        // have to add in a count so that we only delete a collection that is actually no longer used.
    }

    constructor(collection: string, parent: Stoppable | null) {
        super(parent);
        if (!global.ICCServer.collections[collection]) {global.ICCServer.collections[collection] = new Mongo.Collection<T>(collection);}
        this.mongocollection = global.ICCServer.collections[collection];
    }

    public testSetMongoCollection(collection: Mongo.Collection<T>) {
        this.mongocollection = collection;
    }
}
