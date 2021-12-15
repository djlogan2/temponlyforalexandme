import MongoCollection from "/lib/MongoCollection";
import { Meteor } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import { Mongo } from "meteor/mongo";
import { MongoFieldObject } from "./MongoFieldObject";

export default abstract class ReactiveReadOnlyDao<T> extends MongoCollection<T> {
    private observehandle?: Meteor.LiveQueryHandle;

    constructor(parent: Stoppable, collection: string) {
        super(collection, parent);
    }

    // eslint-disable-next-line class-methods-use-this
    private fields(includeOrExclude: "include" | "exclude" | undefined, fields: [keyof T] | undefined): MongoFieldObject<T> | undefined {
        if (!fields) return;
        const fld: MongoFieldObject<T> = { fields: {} };
        fields.forEach((f) => {fld.fields[f] = includeOrExclude === "include";});
        return fld;
    }

    protected start(selector: Mongo.Selector<T>, includeOrExclude: "include" | "exclude" | undefined, fields: [keyof T] | undefined): void {
        const self = this;
        const fld = this.fields(includeOrExclude, fields);

        let cursor;

        if (fld) cursor = this.mongocollection.find(selector, fields);
        else cursor = this.mongocollection.find(selector);

        this.observehandle = cursor.observeChanges({
            added(id, doc) {self.onRecordAdded(id, doc);},
            changed(id, doc) {self.onFieldsChanged(id, doc);},
            removed(id) {self.onRecordRemoved(id);},
        });
    }

    protected stopping(): void {
        this.onStop();
        if (this.observehandle) this.observehandle.stop();
    }

    protected abstract onRecordAdded(id: string, record: Partial<T>): void;

    protected abstract onFieldsChanged(id: string, record: Partial<T>): void;

    protected abstract onRecordRemoved(id: string): void;

    protected abstract onStop(): void;
}
