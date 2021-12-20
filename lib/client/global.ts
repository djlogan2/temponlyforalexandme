import { Mongo } from "meteor/mongo";
import Singleton from "../Singleton";

declare global {
    interface Window {
        // eslint-disable-next-line vars-on-top, no-var
        ICCServer: {
            connection: ClientConnection,
            collections: { [key: string]: Mongo.Collection<any> },
            dao: { [key: string]: any },
            singletons: {[key: string]: Singleton}
        };
    }
}

if (!global.ICCServer) global.ICCServer = { collections: {}, dao: {}, singletons: {} };

export {};
