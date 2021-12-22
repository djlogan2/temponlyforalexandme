import { check } from "meteor/check";
import LoggerConfigurationDao from "/imports/server/dao/LoggerConfigurationDao";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import { Meteor } from "meteor/meteor";
import ServerLogger from "/lib/server/ServerLogger";
import { LOGGERTYPE, LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";

export default class LoggerService {
    private loggerconfigurationdao: LoggerConfigurationDao;

    private loggerdao: LogRecordsDao;

    public get events() {return this.loggerconfigurationdao.events;}

    constructor(loggerconfigdao: LoggerConfigurationDao, loggerdao: LogRecordsDao) {
        this.loggerconfigurationdao = loggerconfigdao;
        this.loggerdao = loggerdao;
        ServerLogger.setLoggerService(this);

        const self = this;
        Meteor.methods({
            writeToLog(level: LOGLEVEL, module: string, message: string) {
                check(level, String);
                check(module, String);
                check(message, String);
                self.writeToLog(level, module, () => message, "client", this.userId, this.connection?.id);
            },
        });
    }

    public writeToLog(level: LOGLEVEL, module: string, func: () => string, type: LOGGERTYPE, userid?: string | null, connection?: string): void {
        const date = new Date();
        const text = func();
        this.loggerdao.insert({
            type,
            date,
            userid,
            connection,
            text,
        });
        const logstring = `${new Date().toDateString()} [${type.toUpperCase()}] [${userid || "NO-USERID"}] [${connection || "NO-CONNECTION"}] ${func()}`;
        console.log(logstring);
    }
}
