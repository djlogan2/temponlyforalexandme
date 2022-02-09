import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import { Subscription } from "meteor/meteor";
import { LOGGERTYPE, LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";
import { LogRecord } from "/lib/records/LogRecord";
import ReadOnlyLoggerConfigurationDao from "/imports/server/dao/ReadOnlyLoggerConfigurationDao";
import LoggerClientMethod from "../clientmethods/LoggerClientMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import PublicationService from "/imports/server/service/PublicationService";
import Stoppable from "/lib/Stoppable";
import ServerConnection from "/lib/server/ServerConnection";
import LoggerPublication from "/imports/server/publications/LoggerPublication";
import ServerUser from "/lib/server/ServerUser";

export default class LoggerService extends Stoppable {
  private readableconfigdao: ReadOnlyLoggerConfigurationDao;

  private writeableconfigdao: WritableLoggerConfigurationDao;

  private loggerdao: LogRecordsDao;

  private loggerclientmethod: LoggerClientMethod;

  public get events() {
    return this.readableconfigdao.events;
  }

  constructor(
    parent: Stoppable | null,
    loggerconfigdao: ReadOnlyLoggerConfigurationDao,
    writableconfigdao: WritableLoggerConfigurationDao,
    loggerdao: LogRecordsDao,
    connectionservice: ConnectionService,
    publicationservice: PublicationService,
  ) {
    super(parent);
    this.readableconfigdao = loggerconfigdao;
    this.writeableconfigdao = writableconfigdao;
    this.loggerdao = loggerdao;
    this.loggerclientmethod = new LoggerClientMethod(
      this,
      this,
      connectionservice,
    );

    this.readLoggerConfiguration();

    globalThis.ICCServer.services.loggerservice = this;

    publicationservice.publishDao(
      "logger_configuration",
      (
        sub: Subscription,
        _connection: ServerConnection | null,
        _user: ServerUser | null,
        ..._args: string[]
      ) => new LoggerPublication(this, sub),
    );
  }

  private readLoggerConfiguration(): void {
    const json = Assets.getText("logger_configuration.json");

    if (json) {
      const parsed = JSON.parse(json);
      Object.entries(parsed).forEach(([module, level]) => {
        const llLevel = (level as string).toLowerCase() as LOGLEVEL;
        this.changeDebugLevel(module, llLevel);
      });
    }
  }

  public writeToLog(
    level: LOGLEVEL,
    module: string,
    message: string,
    type: LOGGERTYPE,
    userid?: string | null,
    connection?: string,
  ): void {
    const date = new Date();
    const text = message;

    const record: Partial<LogRecord> = {
      level,
      module,
      type,
      date,
      text,
    };
    if (userid) record.userid = userid;
    if (connection) record.connection = connection;
    this.loggerdao.insert(record);
    const logstring = `${new Date().toDateString()} ${type.toUpperCase()} ${
      userid || "-"
    } ${connection || "-"} ${module} ${level} ${text}`;
    // eslint-disable-next-line no-console
    console.log(logstring);
  }

  public changeDebugLevel(module: string, newlevel: LOGLEVEL): void {
    this.writeableconfigdao.upsert(
      { module },
      { $set: { debuglevel: newlevel } },
    );
  }

  protected stopping(): void {}
}
