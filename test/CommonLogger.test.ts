// eslint-disable-next-line max-classes-per-file
import { Meteor } from "meteor/meteor";
import CommonLogger from "/lib/logger/CommonLogger";
import {
  LOGLEVEL,
  logLevelStrings,
} from "/lib/records/LoggerConfigurationRecord";
import { expect } from "chai";
import Stoppable from "/lib/Stoppable";

class TestStoppable extends Stoppable {
  constructor() {
    super(null);
  }

  protected stopping(): void {}
}

class TestCommonLogger extends CommonLogger {
  public writeToLogCalled: boolean = false;

  constructor(l: LOGLEVEL) {
    super(
      new TestStoppable(),
      "testcommonlogger",
      Meteor.isClient ? "client" : "server",
    );
    this.logLevelChanged(l);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected writeTolog(
    _level: LOGLEVEL,
    _message: string,
    _userid?: string,
  ): void {
    this.writeToLogCalled = true;
  }

  // eslint-disable-next-line class-methods-use-this
  protected stopping(): void {
    throw new Error("Method not implemented.");
  }
}

describe("CommonLogger", function () {
  describe("various log calls", function () {
    logLevelStrings.forEach((loggerlevel) => {
      logLevelStrings.forEach((requestedlevel) => {
        const ll = CommonLogger.loglevelValue(loggerlevel as LOGLEVEL);
        const rl = CommonLogger.loglevelValue(requestedlevel as LOGLEVEL);
        if (rl <= ll) {
          it(`should ${
            rl <= ll ? "" : "not "
          }write a log entry when log level is ${loggerlevel} and requested level is ${requestedlevel}`, function () {
            const logger = new TestCommonLogger(loggerlevel as LOGLEVEL);
            let messageMethodCalled = false;
            logger[requestedlevel as LOGLEVEL].call(logger, () => {
              messageMethodCalled = true;
              return "message";
            });
            expect(logger.writeToLogCalled).to.equal(rl <= ll);
            expect(messageMethodCalled).to.equal(rl <= ll);
          });
        } else {
          it(`should not write a log entry when log level is ${loggerlevel} and requested level is ${requestedlevel}`, function () {});
        }
      });
    });
  });
});
