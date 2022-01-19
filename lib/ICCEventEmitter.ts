import EventEmitter from "eventemitter3";
import PooledEventEmitter from "/lib/PooledEventEmitter";

export default class ICCEventEmitter<T extends string> {
  private pool: PooledEventEmitter<T>;

  private emitter = new EventEmitter();

  private constructor(pool: PooledEventEmitter<T>) {
    this.pool = pool;
  }

  /**
   * Returns an event emitter tied to a pool (so the pool can do something when the first event is listened to, and do something when the last listened event is removed).
   * This method is not designed to be called by you. The pool instance ({PooledEventEmitter}) will call this.
   * @param{PooledEventEmitter} pool - The {PooledEventEmitter} this event emitter belongs to.
   */
  public static getNew<T extends string>(
    pool: PooledEventEmitter<T>,
  ): ICCEventEmitter<T> {
    return new ICCEventEmitter(pool);
  }

  /**
   * Standard eventemitter "on"
   * @param{string} event
   * @param{function} fn The callback
   */
  public on(event: T, fn: (...args: any[]) => void): void {
    if (!this.emitter.eventNames().length) this.pool.addActiveEmitter();
    this.emitter.on(event, fn);
  }

  /**
   * Standard eventemitter "off"
   * @param{string} event
   * @param{function} fn An optional function for which to remove
   */
  public off(event: T, fn?: (...args: any[]) => void): void {
    this.emitter.off(event, fn);
    if (!this.emitter.eventNames().length) {
      this.pool.removeActiveEmitter();
    }
  }

  /**
   * Standard event emitter removeAllListeners
   */
  public removeAllListeners(): void {
    this.emitter.removeAllListeners();
    // Obviously this should always be true
    if (!this.emitter.eventNames().length) this.pool.removeActiveEmitter();
  }

  /**
   * Standard 'emit'
   * @param{string} event
   * @param{any|undefined} args
   */
  public emit(event: T, ...args: any[]): void {
    this.emitter.emit(event, ...args);
  }
}
