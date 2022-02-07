import { Mongo } from "meteor/mongo";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";

export default abstract class DynamicSelectorReactiveReadOnlyDao<
  T,
> extends ReactiveReadOnlyDao<T> {
  private cursor?: Mongo.Cursor<T, any>;

  /**
   *
   * @param{Mongo.Selector} selector - A mongo selector that will start being observed
   * @param{"include"|"exclude"|undefined} includeOrExclude - If defined, "include" or "exclude" the array of fields
   * @param{string[]} fields An array of fields to either be included or excluded in the returned data. Remember that only returned fields are watched!
   * @protected
   */
  public setSelector(
    selector: Mongo.Selector<T>,
    includeOrExclude?: "include" | "exclude",
    fields?: (keyof T)[],
  ): void {
    const self = this;
    const fld = fields ? this.fields(includeOrExclude, fields) : null;

    let newcursor;

    if (fld) newcursor = this.mongocollection.find(selector, fld);
    else newcursor = this.mongocollection.find(selector);

    let ids: string[] = [];
    if (this.cursor) this.cursor.forEach((rec) => ids.push(rec._id));

    if (this.observehandle) this.observehandle.stop();

    this.cursor = newcursor;

    let count = this.cursor.count();

    this.observehandle = this.cursor.observeChanges({
      added(id, doc) {
        const idx = ids?.length ? ids.indexOf(id) : -1;
        if (idx === -1) self.onRecordAdded(id, doc);
        else {
          ids.splice(idx, 1);
        }
        if (count) {
          count -= 1;
          if (!count) {
            ids.forEach((rid) => self.onRecordRemoved(rid));
            ids = [];
          }
        }
        if (!count) self.onReady();
      },
      changed(id, doc) {
        self.onFieldsChanged(id, doc);
        if (!count) self.onReady();
      },
      removed(id) {
        self.onRecordRemoved(id);
        if (!count) self.onReady();
      },
    });
  }

  /**
   * Call this method if you want to delete all of the records at the client and remove the cursor/handle
   * @protected
   */
  protected killCursor(): void {
    if (!this.cursor) return;
    this.cursor.forEach((rec) => this.onRecordRemoved(rec._id));
    this.onReady();
    this.observehandle?.stop();
    delete this.cursor;
    delete this.observehandle;
  }

  /**
   * Called by the framework when somebody has requested this instance, or a parent of this instance, to be stopped.
   * @protected
   */
  protected stopping(): void {
    super.stopping();
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

  protected abstract onReady(): void;
}
