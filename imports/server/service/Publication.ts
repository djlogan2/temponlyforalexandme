import { CollectionNames } from "/lib/CollectionNames";
import { Subscription } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import ServerLogger from "/lib/server/ServerLogger";
import * as util from "util";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";

export default abstract class Publication<
  T extends { _id: string },
> extends ReactiveReadOnlyDao<T> {
  private logger: ServerLogger;

  private nativesubscription: Subscription;

  protected constructor(
    parent: Stoppable | null,
    pub: Subscription,
    collection: CollectionNames,
  ) {
    super(parent, collection);
    this.logger = new ServerLogger(this, "Publication_js");
    this.nativesubscription = pub;
    this.nativesubscription.onStop(() => {
      this.stopping();
    });
  }

  protected add(id: string, record: Partial<T>): void {
    this.logger.debug(
      () => `${this.collection} add id=${id} record=${util.inspect(record)}`,
    );
    this.nativesubscription.added(this.collection, id, record);
  }

  protected change(id: string, record: Partial<T>): void {
    this.logger.debug(
      () => `${this.collection} change id=${id} record=${util.inspect(record)}`,
    );
    this.nativesubscription.changed(this.collection, id, record);
  }

  protected remove(id: string): void {
    this.logger.debug(() => `${this.collection} remove id=${id}`);
    this.nativesubscription.removed(this.collection, id);
  }

  protected ready(): void {
    this.logger.debug(() => `${this.collection} ready`);
    this.nativesubscription.ready();
  }

  protected stopsub(): void {
    this.logger.debug(() => `${this.collection} stopsub`);
    this.nativesubscription.stop();
  }

  protected substopping(): void {
    this.logger.debug(() => `${this.collection} substopping`);
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
