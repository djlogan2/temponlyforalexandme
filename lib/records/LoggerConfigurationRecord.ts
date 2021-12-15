export const STRINGDEBUGLEVELS = ["fatal", "error", "warn", "info", "debug", "trace"];
export type DEBUGLEVEL = typeof STRINGDEBUGLEVELS[number];

export interface LoggerConfigurationRecord {
    _id: string;
    module: string;
    debuglevel: DEBUGLEVEL
}

