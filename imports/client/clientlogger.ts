import { Meteor } from 'meteor/meteor';
import CommonLogger, { LoggerType, LogLevelEnum } from '../commonlogger';
import ICCServer from './clienticcserver';

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
