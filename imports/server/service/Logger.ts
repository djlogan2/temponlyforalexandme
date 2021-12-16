import LoggerService from "/imports/server/service/LoggerService";

export default class Logger {
    private who: string;

    private loggerservice: LoggerService;

    private constructor(who: string, loggerservice: LoggerService) {
        this.who = who;
        this.loggerservice = loggerservice;
    }

    public fatal(func: () => string): void {
        this.loggerservice.writeToLog("fatal", this.who, func, "server");
    }

    public error(func: () => string): void {
        this.loggerservice.writeToLog("error", this.who, func, "server");
    }

    public warn(func: () => string): void {
        this.loggerservice.writeToLog("warn", this.who, func, "server");
    }

    public info(func: () => string): void {
        this.loggerservice.writeToLog("info", this.who, func, "server");
    }

    public debug(func: () => string): void {
        this.loggerservice.writeToLog("debug", this.who, func, "server");
    }

    public trace(func: () => string): void {
        this.loggerservice.writeToLog("trace", this.who, func, "server");
    }
}
