import { Mongo } from "meteor/mongo";
import Stoppable from "/lib/Stoppable";

export default abstract class MongoCollection<T> extends Stoppable {
    protected mongocollection: Mongo.Collection<T>;

    constructor(collection: string, parent: Stoppable | null) {
        super(parent);
        if (!global.ICCServer.collections[collection]) {global.ICCServer.collections[collection] = new Mongo.Collection<T>(collection);}
        this.mongocollection = global.ICCServer.collections[collection];
    }
}
