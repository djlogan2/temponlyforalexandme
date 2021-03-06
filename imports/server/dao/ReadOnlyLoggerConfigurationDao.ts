import CommonReadOnlyLoggerConfigurationDao from "/imports/dao/CommonReadOnlyLoggerConfigurationDao";
import { LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import EventEmitter from "eventemitter3";
import Stoppable from "/lib/Stoppable";

export default class ReadOnlyLoggerConfigurationDao extends CommonReadOnlyLoggerConfigurationDao {
  private pEvents?: EventEmitter;

  constructor(parent: Stoppable | null) {
    super(parent);
    this.start({});
  }

  public get events() {
    if (!this.pEvents) this.pEvents = new EventEmitter();
    return this.pEvents;
  }

  protected emit(module: string, loglevel: LOGLEVEL): void {
    this.events.emit(module, loglevel);
  }

  protected stopping() {
    super.stopping();
    this.events.removeAllListeners();
  }

  protected onReady(): void {
    if (this.events) this.events.emit("ready");
  }
}
