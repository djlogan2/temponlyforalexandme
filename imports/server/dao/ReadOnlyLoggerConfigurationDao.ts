import CommonReadOnlyLoggerConfigurationDao from "/imports/dao/CommonReadOnlyLoggerConfigurationDao";
import { LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import EventEmitter from "eventemitter3";

export default class ReadOnlyLoggerConfigurationDao extends CommonReadOnlyLoggerConfigurationDao {
    private pEvents = new EventEmitter();

    public get events() {return this.pEvents;}

    protected emit(module: string, loglevel: LOGLEVEL): void {
        this.pEvents.emit(module, loglevel);
    }

    protected stopping() {
        super.stopping();
        this.pEvents.removeAllListeners();
    }
}
