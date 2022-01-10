const CLOGLEVELSTRINGS = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
] as const;
export type LOGLEVEL = typeof CLOGLEVELSTRINGS[number];
export type LOGGERTYPE = "client" | "server";

export const logLevelStrings: readonly string[] = CLOGLEVELSTRINGS;

export interface LoggerConfigurationRecord {
  _id: string;
  module: string;
  debuglevel: LOGLEVEL;
}
