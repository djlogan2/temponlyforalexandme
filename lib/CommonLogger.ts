import { LOGGERTYPE, LOGLEVEL, logLevelStrings } from "/lib/records/LoggerConfigurationRecord";
import Stoppable from "/lib/Stoppable";

export default abstract class CommonLogger extends Stoppable {
    private identlevel: LOGLEVEL;

    protected type: LOGGERTYPE;

    protected identifier: string;

    public get module() {return this.identifier;}

    /**
     *
     * @param{Stoppable} parent The parent of this logger
     * @param{string} identifier The name of the module (should be unique to each logger instance)
     * @param{"client"|"server"} clientServer Whether this is a client logger or a server logger
     */
    constructor(parent: Stoppable, identifier: string, clientServer: LOGGERTYPE) {
        super(parent);
        this.identifier = identifier;
        this.type = clientServer;
        this.identlevel = "debug";
    }

    /**
     * Simple utility function to convert the string to a value. It goes from most important (0, or fatal),
     * to least important (highest value, or trace.) Log records are only written if the level defined in the
     * database is <= the request level (i.e. 'fatal' is always written, but 'error' will be written as long as
     * the modules log level isn't set to 'fatal'.)
     * @param{LOGLEVEL} loglevel The input log level string
     * @return{number} The numerical value
     */
    public static loglevelValue(loglevel: LOGLEVEL): number {
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

    /**
     * This method must be overwritten, as the client must call the server to write the data
     * @param level
     * @param message
     * @param data
     * @param userid
     * @protected
     */
    protected abstract writeTolog(
        level: LOGLEVEL,
        message: string,
        data?: unknown,
        userid?: string
    ): void;

    /**
     * Not really for general use. The underlying framework will call this when the log level changes in the database.
     * @param{LOGLEVEL} newloglevel
     * @protected
     */
    protected logLevelChanged(newloglevel: LOGLEVEL) {
        this.identlevel = newloglevel;
    }

    /**
     * A fatal error
     * @param{string} message A function that results in a message if the log record is written
     * @param{unknown} data? Optional data (I don't think it works...)
     * @param{string} userid? Optional userid
     */
    public fatal(message: () => string, data?: unknown, userid?: string): void {
        this.log("fatal", message, data, userid);
    }

    /**
     * A normal error
     * @param{string} message A function that results in a message if the log record is written
     * @param{unknown} data? Optional data (I don't think it works...)
     * @param{string} userid? Optional userid
     */
    public error(message: () => string, data?: unknown, userid?: string): void {
        this.log("error", message, data, userid);
    }

    /**
     * A warning
     * @param{string} message A function that results in a message if the log record is written
     * @param{unknown} data? Optional data (I don't think it works...)
     * @param{string} userid? Optional userid
     */
    public warn(message: () => string, data?: unknown, userid?: string): void {
        this.log("warn", message, data, userid);
    }

    /**
     * An informational message
     * @param{string} message A function that results in a message if the log record is written
     * @param{unknown} data? Optional data (I don't think it works...)
     * @param{string} userid? Optional userid
     */
    public info(message: () => string, data?: unknown, userid?: string): void {
        this.log("info", message, data, userid);
    }

    /**
     * A debug
     * @param{string} message A function that results in a message if the log record is written
     * @param{unknown} data? Optional data (I don't think it works...)
     * @param{string} userid? Optional userid
     */
    public debug(message: () => string, data?: unknown, userid?: string): void {
        this.log("debug", message, data, userid);
    }

    /**
     * A trace
     * @param{string} message A function that results in a message if the log record is written
     * @param{unknown} data? Optional data (I don't think it works...)
     * @param{string} userid? Optional userid
     */
    public trace(message: () => string, data?: unknown, userid?: string): void {
        this.log("trace", message, data, userid);
    }
}
