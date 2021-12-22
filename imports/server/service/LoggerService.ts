import { check } from "meteor/check";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import { Meteor } from "meteor/meteor";
import ServerLogger from "/lib/server/ServerLogger";
import { LOGGERTYPE, LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import ReadOnlyLoggerConfigurationDao from "/imports/dao/ReadOnlyLoggerConfigurationDao";
import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";

export default class LoggerService {
    private readableconfigdao: ReadOnlyLoggerConfigurationDao;

    private writeableconfigdao: WritableLoggerConfigurationDao;

    private loggerdao: LogRecordsDao;

    public get events() {return this.readableconfigdao.events;}

    constructor(loggerconfigdao: ReadOnlyLoggerConfigurationDao, writableconfigdao: WritableLoggerConfigurationDao, loggerdao: LogRecordsDao) {
        this.readableconfigdao = loggerconfigdao;
        this.writeableconfigdao = writableconfigdao;
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

    public changeDebugLevel(module: string, newlevel: LOGLEVEL): void {
        this.writeableconfigdao.upsert({ module }, { $set: { debuglevel: newlevel } });
    }
}
