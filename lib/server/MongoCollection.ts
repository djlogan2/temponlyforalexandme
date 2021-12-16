import { Mongo } from "meteor/mongo";
import Stoppable from "/lib/server/Stoppable";

// eslint-disable-next-line prefer-destructuring
const ICCServer = global.ICCServer;

export default abstract class MongoCollection<T> extends Stoppable {
    protected mongocollection: Mongo.Collection<T>;

    constructor(identifier: string, collection: string, parent: Stoppable | null) {
        super(identifier, parent);
        if (!ICCServer.collections[collection]) {ICCServer.collections[collection] = new Mongo.Collection<T>(collection);}
        this.mongocollection = ICCServer.collections[collection];
    }
}
