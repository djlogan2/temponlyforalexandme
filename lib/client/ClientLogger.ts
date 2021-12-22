import CommonLogger from "/lib/CommonLogger";
import ReadOnlyLoggerConfigurationDao from "/imports/dao/ReadOnlyLoggerConfigurationDao";
import { Meteor } from "meteor/meteor";

export default class ClientLogger extends CommonLogger {
    private static loggerconfigdao: ReadOnlyLoggerConfigurationDao;

    constructor(module: string) {
        super(module, "client");
        ClientLogger.loggerconfigdao.events.on(module, this.logLevelChanged);
    }

    public static setLoggerConfigDao(configdao: ReadOnlyLoggerConfigurationDao) {
        ClientLogger.loggerconfigdao = configdao;
    }

    protected writeTolog(level: "fatal" | "error" | "warn" | "info" | "debug" | "trace", message: () => string, data?: unknown, userid?: string): void {
        Meteor.call("writeToLog", this.identifier, level, message, data, userid);
    }
}
