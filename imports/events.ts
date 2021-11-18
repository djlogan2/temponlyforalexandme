import {EventEmitter} from "events";

export default class ICCEventEmitter extends EventEmitter {
    private emitter: EventEmitter;
    constructor() {
        this.emitter = new EventEmitter();
    }

    public on(eventName: string | symbol, listener: (...args: any[]) => void): this {
        const boundlistener = Meteor.bindEnvironment((args: any[]) => listener(args));
    };

    public emit(eventName: string | symbol, ...args: any[]): boolean {

    }
}
