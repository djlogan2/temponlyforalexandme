import CommonLogger from "/lib/CommonLogger";
import { Meteor } from "meteor/meteor";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";

export default class ClientLogger extends CommonLogger {
    private static loggerconfigdao: ReadOnlyLoggerConfigurationDao;

    constructor(module: string) {
        super(module, "client");
        ClientLogger.loggerconfigdao.events.on(module, this.logLevelChanged);
    }

    public static setLoggerConfigDao(configdao: ReadOnlyLoggerConfigurationDao) {
        ClientLogger.loggerconfigdao = configdao;
    }

    protected writeTolog(level: "fatal" | "error" | "warn" | "info" | "debug" | "trace", message: string): void {
        Meteor.call("writeToLog", this.module, level, message);
    }
}

CommonLogger.getLogger = (identifier: string) => new ClientLogger(identifier);
