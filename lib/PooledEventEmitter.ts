import ICCEventEmitter from "/lib/ICCEventEmitter";

export default abstract class PooledEventEmitter {
    private count: number = 0;

    protected poolname: string;

    /**
     * The name of the pool. In this class, it is for informational purposes only
     * @param{string} poolname
     * @protected
     */
    protected constructor(poolname: string) {
        this.poolname = poolname;
    }

    /**
     * This returns an emitter connected to this pool, so that when people call ".on", ".off" and ".removeListeners", this class instance will be notified when the first one signs up and the last one cleans up.
     * @return{ICCEventEmitter} ICCEventEmitter
     */
    public newEmitter(): ICCEventEmitter {
        return ICCEventEmitter.getNew(this);
    }

    /**
     * This is not for public use. The emitters will call this.
     */
    public addActiveEmitter(): void {
        if (!this.count) this.onFirstEvent();
        this.count += 1;
    }

    /**
     * This is not for public use. The emitters will call this.
     */
    public removeActiveEmitter(): void {
        this.count -= 1;
        if (!this.count) this.onLastEvent();
    }

    /**
     * Called when the first emitter signs up for the first events. Subsequent events, and even subsequent emitters, will NOT trigger this method.
     * @protected
     */
    protected abstract onFirstEvent(): void;

    /**
     * Called when the last emitter removes the last listener. If this method is invoked, there are no emitters listening to any events in this pool.
     * @protected
     */
    protected abstract onLastEvent(): void;
}

