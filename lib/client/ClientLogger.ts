import CommonLogger from "/lib/CommonLogger";
import { Meteor } from "meteor/meteor";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";

export default class ClientLogger extends CommonLogger {
    private loggerconfigdao: ReadOnlyLoggerConfigurationDao;

    constructor(module: string) {
        super(module, "client");
        if (!global.ICCServer.client || !global.ICCServer.client.dao.loggerconfigdao) throw new Meteor.Error("loggerconfigdao is not defined");
        this.loggerconfigdao = global.ICCServer.client.dao.loggerconfigdao as ReadOnlyLoggerConfigurationDao;
        this.loggerconfigdao.events.on(module, this.logLevelChanged);
    }

    protected writeTolog(level: "fatal" | "error" | "warn" | "info" | "debug" | "trace", message: string): void {
        Meteor.call("writeToLog", this.module, level, message);
    }
}

CommonLogger.getLogger = (identifier: string) => new ClientLogger(identifier);
