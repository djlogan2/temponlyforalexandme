import EventEmitter from "eventemitter3";

class Emitter {
  private static instance: Emitter;

  private eventEmitter = new EventEmitter();

  public static getInstance(): Emitter {
    if (!Emitter.instance) {
      Emitter.instance = new Emitter();
    }

    return Emitter.instance;
  }

  on = <T>(event: string, fn: (args: T) => void) =>
    this.eventEmitter.on(event, fn);

  once = <T>(event: string, fn: (args: T) => void) =>
    this.eventEmitter.once(event, fn);

  off = <T>(event: string, fn?: (args: T) => void) =>
    this.eventEmitter.off(event, fn);

  emit = <T>(event: string, payload: T) =>
    this.eventEmitter.emit(event, payload);
}

export default Emitter.getInstance();
