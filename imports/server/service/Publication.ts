import DynamicSelectorReactiveReadOnlyDao from "/imports/dao/DynamicSelectorReactiveReadOnlyDao";
import { CollectionNames } from "/lib/CollectionNames";
import { Subscription } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";

export default abstract class Publication<
  T extends { _id: string },
> extends DynamicSelectorReactiveReadOnlyDao<T> {
  private collection: CollectionNames;

  private nativesubscription: Subscription;

  protected constructor(
    parent: Stoppable | null,
    pub: Subscription,
    collection: CollectionNames,
  ) {
    super(parent, collection);
    this.nativesubscription = pub;
    this.collection = collection;
    this.nativesubscription.onStop(() => {
      this.stopping();
    });
  }

  protected add(id: string, record: Partial<T>): void {
    this.nativesubscription.added(this.collection, id, record);
  }

  protected change(id: string, record: Partial<T>): void {
    this.nativesubscription.changed(this.collection, id, record);
  }

  protected remove(id: string): void {
    this.nativesubscription.removed(this.collection, id);
  }

  protected ready(): void {
    this.nativesubscription.ready();
  }

  protected stopsub(): void {
    this.nativesubscription.stop();
  }

  protected substopping(): void {
    // this.stopping();
  }

  protected onRecordAdded(id: string, record: Partial<T>): void {
    this.add(id, record);
  }

  protected onFieldsChanged(id: string, record: Partial<T>): void {
    this.change(id, record);
  }

  protected onRecordRemoved(id: string): void {
    this.remove(id);
  }

  protected onReady(): void {
    this.ready();
  }

  protected onStop(): void {
    this.stopsub();
  }
}
