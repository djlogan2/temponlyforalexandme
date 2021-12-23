import LoggerService from "/imports/server/service/LoggerService";
import CommonLogger from "/lib/CommonLogger";
import { LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";

export default class ServerLogger extends CommonLogger {
    private static loggerservice: LoggerService;

    constructor(module: string) {
        super(module, "server");
        ServerLogger.loggerservice.events.on(module, this.logLevelChanged);
    }

    public static setLoggerService(loggerservice: LoggerService) {
        ServerLogger.loggerservice = loggerservice;
    }

    protected writeTolog(level: LOGLEVEL, message: string /* , data?: unknown, userid?: string*/): void {
        ServerLogger.loggerservice.writeToLog(level, this.identifier, message, "server");
    }
}
