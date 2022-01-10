import { check } from "meteor/check";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import { Meteor } from "meteor/meteor";
import { LOGGERTYPE, LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";
import { LogRecord } from "/lib/records/LogRecord";
import ReadOnlyLoggerConfigurationDao from "/imports/server/dao/ReadOnlyLoggerConfigurationDao";

export default class LoggerService {
    private readableconfigdao: ReadOnlyLoggerConfigurationDao;

    private writeableconfigdao: WritableLoggerConfigurationDao;

    private loggerdao: LogRecordsDao;

    public get events() {return this.readableconfigdao.events;}

    constructor(loggerconfigdao: ReadOnlyLoggerConfigurationDao, writableconfigdao: WritableLoggerConfigurationDao, loggerdao: LogRecordsDao) {
        this.readableconfigdao = loggerconfigdao;
        this.writeableconfigdao = writableconfigdao;
        this.loggerdao = loggerdao;

          globalThis.ICCServer.loggerservice = this;

        this.readLoggerConfiguration();

        const self = this;
        // TODO: Maybe fix this? Maybe not? Not sure, since we already have a Meteor.methods in here anyway
        Meteor.publish("logger_configuration", () => globalThis.ICCServer.utilities.getCollection("logger_configuration").find());
        Meteor.methods({
            writeToLog(module: string, level: LOGLEVEL, message: string) {
                check(module, String);
                check(level, String);
                check(module, String);
                check(message, String);
                self.writeToLog(level, module, message, "client", this.userId, this.connection?.id);
            },
        });
    }

    private readLoggerConfiguration(): void {
        const json = Assets.getText("logger_configuration.json");

        if (json) {
            const parsed = JSON.parse(json);
            Object.entries(parsed).forEach(([module, level]) => {
                const llLevel = (level as string).toLowerCase() as LOGLEVEL;
                this.changeDebugLevel(module, llLevel);
            });
        }
    }

    public writeToLog(level: LOGLEVEL, module: string, message: string, type: LOGGERTYPE, userid?: string | null, connection?: string): void {
        const date = new Date();
        const text = message;

        const record: Partial<LogRecord> = {
            level,
            module,
            type,
            date,
            text,
        };
        if (userid) record.userid = userid;
        if (connection) record.connection = connection;
        this.loggerdao.insert(record);
        const logstring = `${new Date().toDateString()} ${type.toUpperCase()} ${userid || "-"} ${connection || "-"} ${module} ${level} ${text}`;
        console.log(logstring);
    }

    public changeDebugLevel(module: string, newlevel: LOGLEVEL): void {
        this.writeableconfigdao.upsert({ module }, { $set: { debuglevel: newlevel } });
    }
}
