import CommonLogger from "/lib/logger/CommonLogger";
import { Meteor } from "meteor/meteor";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import Stoppable from "/lib/Stoppable";

export default class ClientLogger extends CommonLogger {
  constructor(parent: Stoppable, module: string) {
    super(parent, module, "client");
    if (!Meteor.isTest && !Meteor.isAppTest) {
      if (!globalThis.loggerconfigdao) return;
      const loggerconfigdao =
        globalThis.loggerconfigdao as ReadOnlyLoggerConfigurationDao;
      loggerconfigdao.events.on(module, this.logLevelChanged);
      const record = loggerconfigdao.readOne({ module });
      if (record) this.logLevelChanged(record.debuglevel);
    }
  }

  protected writeTolog(
    level: "fatal" | "error" | "warn" | "info" | "debug" | "trace",
    message: string,
  ): void {
    Meteor.call("writeToLog", this.module, level, message, (err: any) => {
      if (err) {
        const logstring = `${new Date().toDateString()} ${this.type.toUpperCase()} ${module} ${level} ${message}`;
        // eslint-disable-next-line no-console
        if (err.reason !== "Method 'writeToLog' not found") console.log(err);
        // eslint-disable-next-line no-console
        console.log(logstring);
      }
    });
  }

  protected stopping(): void {
    if (!Meteor.isTest && !Meteor.isAppTest) {
      if (!globalThis.loggerconfigdao) return;
      const loggerconfigdao =
        globalThis.loggerconfigdao as ReadOnlyLoggerConfigurationDao;
      loggerconfigdao.events.off(this.module, this.logLevelChanged);
    }
  }
}
