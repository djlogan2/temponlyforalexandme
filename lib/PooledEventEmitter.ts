import ICCEventEmitter from "/lib/ICCEventEmitter";

export default abstract class PooledEventEmitter {
    private count: number = 0;

    protected poolname: string;

    protected constructor(poolname: string) {
        this.poolname = poolname;
    }

    public newEmitter(): ICCEventEmitter {
        return ICCEventEmitter.getNew(this);
    }

    public addActiveEmitter(): void {
        if (!this.count) this.onFirstEvent();
        this.count += 1;
    }

    public removeActiveEmitter(): void {
        this.count -= 1;
        if (!this.count) this.onLastEvent();
    }

    protected abstract onFirstEvent(): void;

    protected abstract onLastEvent(): void;
}

