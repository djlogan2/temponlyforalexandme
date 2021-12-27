import { Mongo } from "meteor/mongo";
import Singleton from "../Singleton";

declare global {
    // eslint-disable-next-line vars-on-top, no-var
    var ICCServer: {
        collections: {[key: string]: Mongo.Collection<any>},
        singletons: {[key: string]: Singleton}
    };
}
