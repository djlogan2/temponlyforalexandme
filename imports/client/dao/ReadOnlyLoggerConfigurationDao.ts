import CommonReadOnlyLoggerConfigurationDao from "/imports/dao/CommonReadOnlyLoggerConfigurationDao";
import ICCEventEmitter from "/lib/ICCEventEmitter";
import Stoppable from "/lib/Stoppable";
import { LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import SubscriptionService from "/imports/client/service/SubscriptionService";

export default class ReadOnlyLoggerConfigurationDao extends CommonReadOnlyLoggerConfigurationDao {
  private readonly pEvents: ICCEventEmitter<string>;

  public get events() {
    return this.pEvents;
  }

  constructor(
    parent: Stoppable | null,
    subscriptionservice: SubscriptionService,
  ) {
    super(parent);
    this.pEvents = subscriptionservice.getSubscriptionEventEmitter(
      "logger_configuration",
    );
  }

  /**
   * This class exists ONLY to provide an emitter (it's a different emitter on the server.)
   * @param{string} module
   * @param{LOGLEVEL} loglevel
   * @protected
   */
  protected emit(module: string, loglevel: LOGLEVEL): void {
    this.pEvents.emit(module, loglevel);
  }

  protected stopping(): void {
    super.stopping();
    this.pEvents.removeAllListeners();
  }
}
