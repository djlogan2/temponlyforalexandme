import CommonLoggerConfigurationDao, {LoggerType} from "/imports/dao/CommonLoggerConfigurationDao";

export abstract class CommonLogger {
    private who: string;

    private loggerservice: CommonLoggerService;

    private constructor(who: string, loggerservice: CommonLoggerService) {
        this.who = who;
        this.loggerservice = loggerservice;
    }

    public fatal(func: () => string): void {this.loggerservice.writeToLog(LoggerType.FATAL, this.who, func);}

    public error(func: () => string): void {this.loggerservice.writeToLog(LoggerType.ERROR, this.who, func);}

    public warn(func: () => string): void {this.loggerservice.writeToLog(LoggerType.WARN, this.who, func);}

    public info(func: () => string): void {this.loggerservice.writeToLog(LoggerType.INF0, this.who, func);}

    public debug(func: () => string): void {this.loggerservice.writeToLog(LoggerType.DEBUG, this.who, func);}
}

export default abstract class CommonLoggerService {
    private loggerconfigurationdao: CommonLoggerConfigurationDao;

    constructor(loggerconfigdao: CommonLoggerConfigurationDao, loggerdao) {
        this.loggerconfigurationdao = loggerconfigdao;
    }

    public createLogger(who: string): CommonLogger {
        return this.internalCreateLogger(who, this);
    }

    protected abstract internalCreateLogger(who: string, loggerservice: CommonLoggerService): CommonLogger;

    public writeToLog(level: LoggerType, who: string, func: () => string): void {
        const loglevel = CommonLoggerConfigurationDao.getModuleLevel(who);
        if(level < loglevel) return;
    }
}
