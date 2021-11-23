import CommonLogger, { LogLevelEnum } from '../commonlogger';
import ClientICCServer from './clienticcserver';

declare const ICCServer: ClientICCServer;

export default class ClientLogger extends CommonLogger {
  constructor(identifier: string) {
    super(identifier, 'CLIENT');
  }

  protected writeTolog(
    level: LogLevelEnum,
    message: string,
    data?: unknown,
  ): void {
    console.log(`TRYING TO DO a Meteor.call!!!! id=${this.identifier}, level=${level}, message=${message}`);
    Meteor.call('Logger__writeToLog', this.identifier, level, message, data, (err) => {
      if (err) console.log(`Error writing to log: ${err}`);
    });
  }
}

Meteor.startup(() => {
  ICCServer.createLogger = (identifier) => new ClientLogger(identifier);
});
