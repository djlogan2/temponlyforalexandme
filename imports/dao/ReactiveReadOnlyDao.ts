import { Meteor } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import { Mongo } from "meteor/mongo";
import ReadOnlyDao from "/imports/dao/ReadOnlyDao";
import {CollectionNames} from "/lib/CollectionNames";

export default abstract class ReactiveReadOnlyDao<T> extends ReadOnlyDao<T> {
    private observehandle?: Meteor.LiveQueryHandle;

    constructor(parent: Stoppable | null, collection: CollectionNames) {
        super(collection, parent);
    }

    /**
     *
     * @param{Mongo.Selector} selector - A mongo selector that will start being observed
     * @param{"include"|"exclude"|undefined} includeOrExclude - If defined, "include" or "exclude" the array of fields
     * @param{string[]} fields An array of fields to either be included or excluded in the returned data. Remember that only returned fields are watched!
     * @protected
     */
    protected start(selector: Mongo.Selector<T>, includeOrExclude: "include" | "exclude" | undefined, fields: [keyof T] | undefined): void {
        const self = this;
        const fld = this.fields(includeOrExclude, fields);

        let cursor;

        if (fld) cursor = this.mongocollection.find(selector, fld);
        else cursor = this.mongocollection.find(selector);

        this.observehandle = cursor.observeChanges({
            added(id, doc) {
                self.onRecordAdded(id, doc);
            },
            changed(id, doc) {
                self.onFieldsChanged(id, doc);
            },
            removed(id) {
                self.onRecordRemoved(id);
            },
        });
    }

    /**
     * Called by the framework when somebody has requested this instance, or a parent of this instance, to be stopped.
     * @protected
     */
    protected stopping(): void {
        super.stopping();
        this.onStop();
        if (this.observehandle) this.observehandle.stop();
    }

    /**
     * Standard mongo observable - the ID and whatever was added.
     * @param id{string} The ID
     * @param record{Partial<T>>} Whatever was added to the database
     * @protected
     */
    protected abstract onRecordAdded(id: string, record: Partial<T>): void;

    /**
     * Standard mongo observable - the ID and whatever was changed.
     * @param id{string} The ID
     * @param record{Partial<T>>} Whatever was changed in the database
     * @protected
     */
    protected abstract onFieldsChanged(id: string, record: Partial<T>): void;

    /**
     * Standard mongo observable - the ID of whatever record was deleted.
     * @param id{string} The ID
     * @protected
     */
    protected abstract onRecordRemoved(id: string): void;

    protected abstract onStop(): void;
}
