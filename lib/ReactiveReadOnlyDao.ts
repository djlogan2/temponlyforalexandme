import { Meteor } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import { Mongo } from "meteor/mongo";
import ReadOnlyDao from "/lib/ReadOnlyDao";

export default abstract class ReactiveReadOnlyDao<T> extends ReadOnlyDao<T> {
    private observehandle?: Meteor.LiveQueryHandle;

    constructor(parent: Stoppable | null, collection: string) {
        super(collection, parent);
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
