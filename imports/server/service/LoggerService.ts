import { check } from "meteor/check";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import { Meteor } from "meteor/meteor";
import ServerLogger from "/lib/server/ServerLogger";
import { LOGGERTYPE, LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import ReadOnlyLoggerConfigurationDao from "/imports/dao/ReadOnlyLoggerConfigurationDao";
import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";
import CommonLogger from "/lib/CommonLogger";

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
        CommonLogger.getLogger = (identifier: string) => new ServerLogger(identifier);

        const self = this;
        Meteor.methods({
            writeToLog(module: string, level: LOGLEVEL, message: string) {
                check(module, String);
                check(level, String);
                check(module, String);
                check(message, String);
                self.writeToLog(level, module, () => message, "client", this.userId, this.connection?.id);
            },
        });
    }

    public writeToLog(level: LOGLEVEL, module: string, message: () => string, type: LOGGERTYPE, userid?: string | null, connection?: string): void {
        const date = new Date();
        const text = message();
        this.loggerdao.insert({
            level,
            module,
            type,
            date,
            userid,
            connection,
            text,
        });
        const logstring = `${new Date().toDateString()} ${type.toUpperCase()} ${userid || "-"} ${connection || "-"} ${module} ${level} ${text}`;
        console.log(logstring);
    }

    public changeDebugLevel(module: string, newlevel: LOGLEVEL): void {
        this.writeableconfigdao.upsert({ module }, { $set: { debuglevel: newlevel } });
    }
}
