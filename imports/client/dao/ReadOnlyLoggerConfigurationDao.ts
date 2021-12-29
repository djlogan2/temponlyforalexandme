import CommonReadOnlyLoggerConfigurationDao from "/imports/dao/CommonReadOnlyLoggerConfigurationDao";
import SubscriptionEventEmitter from "/lib/client/SubscriptionEventEmitter";
import ICCEventEmitter from "/lib/ICCEventEmitter";
import Stoppable from "/lib/Stoppable";
import { LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";

export default class ReadOnlyLoggerConfigurationDao extends CommonReadOnlyLoggerConfigurationDao {
    private pEvents: ICCEventEmitter;

    public get events() {return this.pEvents;}

    constructor(parent: Stoppable | null) {
        super(parent);
        this.pEvents = SubscriptionEventEmitter.getSubscriptionEventEmitter("logger_configuration");
    }

    protected emit(module: string, loglevel: LOGLEVEL): void {
        this.pEvents.emit(module, loglevel);
    }

    protected stopping(): void {
        super.stopping();
        this.pEvents.removeAllListeners();
    }
}
