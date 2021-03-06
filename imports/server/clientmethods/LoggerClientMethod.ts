import { check } from "meteor/check";
import LoggerService from "../service/LoggerService";
import AbstractClientMethod, {
  ClientCallObject,
} from "../../../lib/server/AbstractClientMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import { LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import Stoppable from "/lib/Stoppable";

interface LoggerClientCall extends ClientCallObject {
  module: string;
  level: LOGLEVEL;
  message: string;
}

export default class LoggerClientMethod extends AbstractClientMethod {
  private loggerservice: LoggerService;

  constructor(
    parent: Stoppable | null,
    loggerservice: LoggerService,
    connectionservice: ConnectionService,
  ) {
    super(
      parent,
      "writeToLog",
      ["module", "level", "message"],
      [],
      connectionservice,
    );
    this.loggerservice = loggerservice;
  }

  protected validatearguments(obj: LoggerClientCall): void {
    check(obj.module, String);
    check(obj.level, String);
    check(obj.message, String);
  }

  protected called(obj: LoggerClientCall): Promise<any> {
    this.loggerservice.writeToLog(
      obj.level,
      obj.module,
      obj.message,
      "client",
      obj.user?.id || null,
      obj.connection?._id || undefined,
    );
    return Promise.resolve();
  }

  protected stopping() {}
}
