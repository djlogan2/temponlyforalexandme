import CommonLoggerConfigurationDao from "/imports/dao/CommonLoggerConfigurationDao";
import {DEBUGLEVEL} from "/lib/records/LoggerConfigurationRecord";

export abstract class CommonLogger {
    private who: string;

    private loggerservice: CommonLoggerService;

    private constructor(who: string, loggerservice: CommonLoggerService) {
        this.who = who;
        this.loggerservice = loggerservice;
    }

    public fatal(func: () => string): void {this.loggerservice.writeToLog("fatal", this.who, func);}

    public error(func: () => string): void {this.loggerservice.writeToLog("error", this.who, func);}

    public warn(func: () => string): void {this.loggerservice.writeToLog("warn", this.who, func);}

    public info(func: () => string): void {this.loggerservice.writeToLog("info", this.who, func);}

    public debug(func: () => string): void {this.loggerservice.writeToLog("debug", this.who, func);}

    public trace(func: () => string): void {this.loggerservice.writeToLog("trace", this.who, func);}
}

export default abstract class CommonLoggerService {
    private loggerconfigurationdao: CommonLoggerConfigurationDao;

    constructor(loggerconfigdao: CommonLoggerConfigurationDao, loggerdao) {
        this.loggerconfigurationdao = loggerconfigdao;
    }

    public createLogger(who: string): CommonLogger {
        return this.internalCreateLogger(module, this);
    }

    protected abstract internalCreateLogger(module: string, loggerservice: CommonLoggerService): CommonLogger;

    public writeToLog(level: DEBUGLEVEL, module: string, func: () => string): void {
        if(!this.loggerconfigurationdao.writable(module, level)) return;
    }
}
