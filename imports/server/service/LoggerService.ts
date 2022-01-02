import { check } from "meteor/check";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import { Meteor } from "meteor/meteor";
import ServerLogger from "/lib/server/ServerLogger";
import { LOGGERTYPE, LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";
import CommonLogger from "/lib/CommonLogger";
import { LogRecord } from "/lib/records/LogRecord";
import ReadOnlyLoggerConfigurationDao from "/imports/server/dao/ReadOnlyLoggerConfigurationDao";
import Stoppable from "/lib/Stoppable";

export default class LoggerService {
    private readableconfigdao: ReadOnlyLoggerConfigurationDao;

    private writeableconfigdao: WritableLoggerConfigurationDao;

    private loggerdao: LogRecordsDao;

    public get events() {return this.readableconfigdao.events;}

    constructor(loggerconfigdao: ReadOnlyLoggerConfigurationDao, writableconfigdao: WritableLoggerConfigurationDao, loggerdao: LogRecordsDao) {
        this.readableconfigdao = loggerconfigdao;
        this.writeableconfigdao = writableconfigdao;
        this.loggerdao = loggerdao;

        if (!global.ICCServer) global.ICCServer = { collections: {}, client: { subscriptions: {}, dao: {} }, server: { services: {} } };
        // @ts-ignore
        global.ICCServer.server.services.loggerservice = this;
        CommonLogger.getLogger = (parent: Stoppable, identifier: string) => new ServerLogger(parent, identifier);
        this.readLoggerConfiguration();

        const self = this;
        // TODO: Maybe fix this? Maybe not? Not sure, since we already have a Meteor.methods in here anyway
        Meteor.publish("logger_configuration", () => global.ICCServer.collections.logger_configuration.find());
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
        // @ts-ignore
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
        // @ts-ignore
        const record: LogRecord = {
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
