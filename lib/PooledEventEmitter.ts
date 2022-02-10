import ICCEventEmitter from "/lib/ICCEventEmitter";
import Stoppable from "/lib/Stoppable";
import { SubscriptionNames } from "/lib/SubscriptionNames";
import ClientLogger from "/lib/client/ClientLogger";

export default abstract class PooledEventEmitter<
  T extends string,
> extends Stoppable {
  private count: number = 0;

  private logger: ClientLogger;

  protected poolname: SubscriptionNames;

  /**
   * The name of the pool. In this class, it is for informational purposes only
   * @param{string} poolname
   * @param{Stoppable} parent Our stoppable parent, or null
   * @protected
   */
  protected constructor(poolname: SubscriptionNames, parent: Stoppable | null) {
    super(parent);
    this.logger = new ClientLogger(this, "PooledEventEmitter");
    this.poolname = poolname;
  }

  /**
   * This returns an emitter connected to this pool, so that when people call ".on", ".off" and ".removeListeners", this class instance will be notified when the first one signs up and the last one cleans up.
   * @return{ICCEventEmitter} ICCEventEmitter
   */
  public newEmitter(): ICCEventEmitter<T | "ready"> {
    this.logger.debug(() => `${this.poolname} newEmitter`);
    return ICCEventEmitter.getNew(this);
  }

  /**
   * This is not for public use. The emitters will call this.
   */
  public addActiveEmitter(emitter: ICCEventEmitter<T | "ready">): void {
    this.logger.debug(() => `${this.poolname} addActiveEmitter`);
    if (!this.count) this.onFirstEvent(() => emitter.emit("ready"));
    else emitter.emit("ready");
    this.count += 1;
  }

  /**
   * This is not for public use. The emitters will call this.
   */
  public removeActiveEmitter(): void {
    this.logger.debug(() => `${this.poolname} removeActiveEmitter`);
    this.count -= 1;
    if (!this.count) this.onLastEvent();
  }

  /**
   * Called when the first emitter signs up for the first events. Subsequent events, and even subsequent emitters, will NOT trigger this method.
   * @protected
   */
  protected abstract onFirstEvent(isready: () => void): void;

  /**
   * Called when the last emitter removes the last listener. If this method is invoked, there are no emitters listening to any events in this pool.
   * @protected
   */
  protected abstract onLastEvent(): void;
}
