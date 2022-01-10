// eslint-disable-next-line max-classes-per-file
import Stoppable from "/lib/Stoppable";
import CommonLogger from "/lib/CommonLogger";
import { Meteor } from "meteor/meteor";
import { LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";

class BogusParent extends Stoppable {
  constructor() {
    super(null);
  }

  // eslint-disable-next-line class-methods-use-this
  protected stopping(): void {}
}

export default class ConsoleLogger extends CommonLogger {
  constructor(parent: Stoppable | null, identifier: string) {
    super(
      parent || new BogusParent(),
      identifier,
      Meteor.isClient ? "client" : "server",
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected stopping(): void {}

  // eslint-disable-next-line class-methods-use-this
  protected writeTolog(
    level: LOGLEVEL,
    message: string,
    userid?: string,
  ): void {
    const logstring = `${new Date().toDateString()} ${this.type.toUpperCase()} ${
      userid || "-"
    } ${module} ${level} ${message}`;
    console.log(logstring);
  }
}

export function consoleLogger(parent: Stoppable, identifier: string) {
  return new ConsoleLogger(parent, identifier);
}
