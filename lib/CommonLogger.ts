import { Meteor } from "meteor/meteor";
import { LOGGERTYPE, LOGLEVEL, logLevelStrings } from "/lib/records/LoggerConfigurationRecord";

export default abstract class CommonLogger {
    private identlevel: LOGLEVEL;

    protected type: LOGGERTYPE;

    protected identifier: string;

    public get module() {return this.identifier;}

    constructor(identifier: string, clientServer: LOGGERTYPE) {
        this.identifier = identifier;
        this.type = clientServer;
        this.identlevel = "debug";
    }

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getLogger(identifier: string): CommonLogger {
        //
        // This method is designed to be overridden on the client and the server,
        // so that we can create client/server specific loggers without having to
        // know if we are on the client or the server
        throw new Meteor.Error("getLogger needs to be replaced");
    }

    private static loglevelValue(loglevel: LOGLEVEL): number {
        return logLevelStrings.indexOf(loglevel);
    }

    private get ourloglevel(): number {return CommonLogger.loglevelValue(this.identlevel);}

    private writable(requestedloglevel: LOGLEVEL): boolean {
        return (this.ourloglevel >= CommonLogger.loglevelValue(requestedloglevel));
    }

    private log(level: LOGLEVEL, message: () => string, data?: unknown, userid?: string) {
        if (!this.writable(level)) return;
        this.writeTolog(level, message(), data, userid);
    }

    protected abstract writeTolog(
        level: LOGLEVEL,
        message: string,
        data?: unknown,
        userid?: string
    ): void;

    public logLevelChanged(newloglevel: LOGLEVEL) {
        this.identlevel = newloglevel;
    }

    public fatal(message: () => string, data?: unknown, userid?: string): void {
        this.log("fatal", message, data, userid);
    }

    public error(message: () => string, data?: unknown, userid?: string): void {
        this.log("error", message, data, userid);
    }

    public warn(message: () => string, data?: unknown, userid?: string): void {
        this.log("warn", message, data, userid);
    }

    public info(message: () => string, data?: unknown, userid?: string): void {
        this.log("info", message, data, userid);
    }

    public debug(message: () => string, data?: unknown, userid?: string): void {
        this.log("debug", message, data, userid);
    }

    public trace(message: () => string, data?: unknown, userid?: string): void {
        this.log("trace", message, data, userid);
    }
}
