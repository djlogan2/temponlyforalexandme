import EventEmitter from "eventemitter3";
import PooledEventEmitter from "/lib/PooledEventEmitter";

export default class ICCEventEmitter extends EventEmitter {
    private count: number = 0;

    private pool: PooledEventEmitter;

    private constructor(pool: PooledEventEmitter) {
        super();
        this.pool = pool;
    }

    public static getNew(pool: PooledEventEmitter): ICCEventEmitter {
        return new ICCEventEmitter(pool);
    }

    public addListener<T extends EventEmitter.EventNames<string | symbol>>(event: T, fn: EventEmitter.EventListener<string | symbol, T>, context?: any): this {
        if (!this.count) this.pool.addActiveEmitter();
        this.count += 1;
        return super.addListener(event, fn, context);
    }

    public removeListener<T extends EventEmitter.EventNames<string | symbol>>(event: T, fn?: EventEmitter.EventListener<string | symbol, T>, context?: any, once?: boolean): this {
        this.count -= 1;
        if (!this.count) this.pool.removeActiveEmitter();
        return super.removeListener(event, fn, context, once);
    }

    public removeAllListeners(event?: EventEmitter.EventNames<string | symbol>): this {
        if (this.count) this.pool.removeActiveEmitter();
        this.count = 0;
        return super.removeAllListeners(event);
    }

    public get used(): boolean {return !!this.count;}
}
