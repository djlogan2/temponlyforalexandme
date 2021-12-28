import EventEmitter from "eventemitter3";
import PooledEventEmitter from "/lib/PooledEventEmitter";

export default class ICCEventEmitter {
    private pool: PooledEventEmitter;

    private emitter = new EventEmitter();

    private constructor(pool: PooledEventEmitter) {
        this.pool = pool;
    }

    public static getNew(pool: PooledEventEmitter): ICCEventEmitter {
        return new ICCEventEmitter(pool);
    }

    public on(event: string, fn: () => void): void {
        if (!this.emitter.eventNames().length) this.pool.addActiveEmitter();
        this.emitter.on(event, fn);
    }

    public off(event: string): void {
        this.emitter.off(event);
        if (!this.emitter.eventNames().length) this.pool.removeActiveEmitter();
    }

    public removeAllListeners(): void {
        this.emitter.removeAllListeners();
        // Obviously this should always be true
        if (!this.emitter.eventNames().length) this.pool.removeActiveEmitter();
    }

    public emit(event: string): void {
        this.emitter.emit(event);
    }
}
