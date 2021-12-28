import ReadOnlyDao from "/lib/ReadOnlyDao";
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import EventEmitter from "eventemitter3";

export default class Publication<T> extends ReadOnlyDao<T> {
    private events = new EventEmitter();

    /**
     * Publishes a set of records, with an optionally included or excluded set of fields, to clients
     * @param{string} publicationname The name of the publication
     * @param{Mongo.Selector} selector The mongo selector
     * @param{"include"|"exclude"|undefined} includeOrExclude not specified, or whether to include or exclude the array of field names
     * @param{string[]} fields The array of field names (object keys) to include in this record or exclude from this record
     */
    protected publish(publicationname: string, selector: Mongo.Selector<T>, includeOrExclude?: "include" | "exclude", fields?: (keyof T)[]): void {
        const fld = this.fields(includeOrExclude, fields);
        const self = this;
        Meteor.publish(publicationname, function() {
            // eslint-disable-next-line no-invalid-this
            self.events.on("stop", () => this.stop());
            if (fld) return self.mongocollection.find(selector, fld).fetch();
            return self.mongocollection.find(selector).fetch();
        });
    }

    protected stopping(): void {
        this.events.emit("stop");
    }
}
