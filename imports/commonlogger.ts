import CommonICCServer from "./commoniccserver";

export enum LogLevelEnum {
  FATAL = 1,
  ERROR = 2,
  WARN = 3,
  INFO = 4,
  DEBUG = 5,
  TRACE = 6,
}

export const loglevelStrings = ['UNKNOWN', 'FATAL', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];

export enum LoggerType {
  CLIENT = 'CLIENT',
  SERVER = 'SERVER'
}

declare const ICCServer: CommonICCServer;

export default abstract class CommonLogger {
  private identlevel: LogLevelEnum;

  private rootlevel: LogLevelEnum;

  private roothandle: Meteor.LiveQueryHandle;

  private identhandle: Meteor.LiveQueryHandle;

  protected type: LoggerType;

  protected identifier: string;

  constructor(identifier: string, clientServer: LoggerType) {
    this.identifier = identifier;
    this.type = clientServer;
    this.rootlevel = LogLevelEnum.DEBUG;
  }

  public get loglevel(): LogLevelEnum {
    return this.identlevel || this.rootlevel;
  }

  private log(level: LogLevelEnum, message: () => string, data?: unknown, userid?: string) {
    if ((this.identlevel || this.rootlevel) >= level) this.writeTolog(level, message(), data, userid);
  }

  protected abstract writeTolog(
    level: LogLevelEnum,
    message: string,
    data?: unknown,
    userid?: string
  ): void;

  public fatal(message: () => string, data?: unknown, userid?: string): void {
    this.log(LogLevelEnum.FATAL, message, data, userid);
  }

  public error(message: () => string, data?: unknown, userid?: string): void {
    this.log(LogLevelEnum.ERROR, message, data, userid);
  }

  public warn(message: () => string, data?: unknown, userid?: string): void {
    this.log(LogLevelEnum.WARN, message, data, userid);
  }

  public info(message: () => string, data?: unknown, userid?: string): void {
    this.log(LogLevelEnum.INFO, message, data, userid);
  }

  public debug(message: () => string, data?: unknown, userid?: string): void {
    this.log(LogLevelEnum.DEBUG, message, data, userid);
  }

  public trace(message: () => string, data?: unknown, userid?: string): void {
    this.log(LogLevelEnum.TRACE, message, data, userid);
  }

  private watchRootLogLevel() {
    this.roothandle = ICCServer.collections.loggerconfig
      .find({ source: 'root' })
      .observeChanges({
        added(id, rec) {
          this.rootlevel = rec.level;
        },
        changed(id, rec) {
          if ('level' in rec) this.rootlevel = rec.level;
        },
        removed() {
          this.rootlevel = LogLevelEnum.DEBUG;
        },
      });
  }

  private watchLogLevel() {
    this.identhandle = ICCServer.collections.loggerconfig
      .find({ source: this.identifier })
      .observeChanges({
        added(id, rec) {
          this.identlevel = rec.level;
        },
        changed(id, rec) {
          if ('level' in rec) this.identlevel = rec.level;
        },
        removed() {
          this.identlevel = undefined;
        },
      });
  }
}

Meteor.startup(() => {
  if (!ICCServer.collections.logs) ICCServer.collections.logs = new Mongo.Collection('logs');
  if (!ICCServer.collections.loggerconfig) ICCServer.collections.loggerconfig = new Mongo.Collection('loggerconfig');
});
