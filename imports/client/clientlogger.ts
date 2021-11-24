import CommonLogger, { LoggerType, LogLevelEnum } from '../commonlogger';
import ClientICCServer from './clienticcserver';

declare const ICCServer: ClientICCServer;

export default class ClientLogger extends CommonLogger {
  constructor(identifier: string) {
    super(identifier, LoggerType.CLIENT);
  }

  protected writeTolog(
    level: LogLevelEnum,
    message: string,
    data?: unknown,
  ): void {
    Meteor.call('Logger__writeToLog', this.identifier, level, message, data, (err) => {
      if (err) console.log(`Error writing to log: ${err}`);
    });
  }
}

Meteor.startup(() => {
  ICCServer.createLogger = (identifier) => new ClientLogger(identifier);
});
