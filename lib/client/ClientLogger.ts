import CommonLogger from "/lib/CommonLogger";
import { Meteor } from "meteor/meteor";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import Stoppable from "/lib/Stoppable";

export default class ClientLogger extends CommonLogger {
  constructor(parent: Stoppable, module: string) {
    super(parent, module, "client");
    if (!Meteor.isTest && !Meteor.isAppTest) {
      if (!global.ICCServer?.client?.dao?.loggerconfigdao) return;
      const loggerconfigdao = global.ICCServer.client.dao
        .loggerconfigdao as ReadOnlyLoggerConfigurationDao;
      loggerconfigdao.events.on(module, this.logLevelChanged);
    }
  }

  protected writeTolog(
    level: "fatal" | "error" | "warn" | "info" | "debug" | "trace",
    message: string,
  ): void {
    Meteor.call("writeToLog", this.module, level, message, (err: any) => {
      if (err) {
        const logstring = `${new Date().toDateString()} ${this.type.toUpperCase()} ${module} ${level} ${message}`;
        if (err.reason !== "Method 'writeToLog' not found") console.log(err);
        console.log(logstring);
      }
    });
  }

  protected stopping(): void {
    if (!Meteor.isTest && !Meteor.isAppTest) {
      if (!global.ICCServer?.client?.dao?.loggerconfigdao) return;
      const loggerconfigdao = global.ICCServer.client.dao
        .loggerconfigdao as ReadOnlyLoggerConfigurationDao;
      loggerconfigdao.events.off(this.module, this.logLevelChanged);
    }
  }
}

if (!global.ICCServer)
  global.ICCServer = {
    collections: {},
    client: { subscriptions: {}, dao: {} },
    utilities: {
      getLogger: (parent: Stoppable, identifier: string) =>
        new ClientLogger(parent, identifier),
    },
  };
