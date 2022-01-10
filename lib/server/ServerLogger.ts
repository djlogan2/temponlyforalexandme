import CommonLogger from "/lib/CommonLogger";
import { LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import Stoppable from "/lib/Stoppable";

export default class ServerLogger extends CommonLogger {
    private fn;

    constructor(parent: Stoppable, module: string) {
        super(parent, module, "server");
        this.fn = (newlevel: LOGLEVEL) => this.logLevelChanged(newlevel);
        if (!(globalThis.ICCServer.loggerservice)) return;
        globalThis.ICCServer.loggerservice.events.on(module, this.fn);
    }

    protected writeTolog(level: LOGLEVEL, message: string): void {
        if (!(globalThis.ICCServer.loggerservice)) return;
        globalThis.ICCServer.loggerservice.writeToLog(level, this.identifier, message, "server");
    }

    protected stopping(): void {
        if (!(globalThis.ICCServer.loggerservice)) return;
        globalThis.ICCServer.loggerservice.events.off(this.module, this.fn);
    }
}
