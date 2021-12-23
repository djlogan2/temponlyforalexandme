import {LOGLEVEL} from "/lib/records/LoggerConfigurationRecord";

export interface LogRecord {
    _id: string;
    type: "client" | "server";
    level: LOGLEVEL;
    module: string;
    date: Date;
    userid: string | undefined | null;
    connection: string | undefined | null;
    text: string;
}
