import CommonReadOnlyLoggerConfigurationDao from "/imports/dao/CommonReadOnlyLoggerConfigurationDao";
import ICCEventEmitter from "/lib/ICCEventEmitter";
import Stoppable from "/lib/Stoppable";
import { LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import SubscriptionService from "/imports/client/service/SubscriptionService";

export default class ReadOnlyLoggerConfigurationDao extends CommonReadOnlyLoggerConfigurationDao {
    private pEvents: ICCEventEmitter;

    public get events() {return this.pEvents;}

    constructor(parent: Stoppable | null, subscriptionservice: SubscriptionService) {
        super(parent);
        this.pEvents = subscriptionservice.getSubscriptionEventEmitter("logger_configuration");
    }

    protected emit(module: string, loglevel: LOGLEVEL): void {
        this.pEvents.emit(module, loglevel);
    }

    protected stopping(): void {
        super.stopping();
        this.pEvents.removeAllListeners();
    }
}
