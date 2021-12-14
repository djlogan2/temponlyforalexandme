import { Mongo } from "meteor/mongo";

export default class CollectionManager {
    public static getCollection<T>(collection: string): Mongo.Collection<T> {
        if (!global.ICCServer) global.ICCServer = {};
        if (!global.ICCServer.collections) global.ICCServer.collections = {};
        if (!global.ICCServer.collections[collection]) global.ICCServer.collections[collection] = new Mongo.Collection<T>(collection);
        return global.ICCServer.collections[collection];
    }
}
