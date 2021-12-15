import { Mongo } from "meteor/mongo";
import Stoppable from "/lib/Stoppable";

// eslint-disable-next-line prefer-destructuring
const ICCServer = global.ICCServer;

export default abstract class MongoCollection<T> extends Stoppable {
    protected mongocollection: Mongo.Collection<T>;

    constructor(collection: string, parent: Stoppable) {
        super(parent);
        if (!ICCServer.collections[collection]) {ICCServer.collections[collection] = new Mongo.Collection<T>(collection);}
        this.mongocollection = ICCServer.collections[collection];
    }
}
