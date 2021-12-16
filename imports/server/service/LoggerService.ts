import LoggerConfigurationDao from "/imports/server/dao/LoggerConfigurationDao";
import { DEBUGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";

export default class LoggerService {
    private loggerconfigurationdao: LoggerConfigurationDao;

    private loggerdao: LogRecordsDao;

    constructor(loggerconfigdao: LoggerConfigurationDao, loggerdao: LogRecordsDao) {
        this.loggerconfigurationdao = loggerconfigdao;
        this.loggerdao = loggerdao;
    }

    public writeToLog(level: DEBUGLEVEL, module: string, func: () => string, type: "client" | "server", userid?: string, connection?: string): void {
        if (!this.loggerconfigurationdao.writable(module, level)) return;
        const text = func();
        this.loggerdao.insert({
            type,
            date: new Date(),
            userid,
            connection,
            text,
        });
        const logstring = `${new Date().toDateString()} [${type.toUpperCase()}] [${userid || "NO-USERID"}] [${connection || "NO-CONNECTION"}] ${func()}`;
        console.log(logstring);
    }
}
