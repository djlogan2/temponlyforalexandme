import * as assert from "assert";
import { Meteor } from "meteor/meteor";
import CommonLogger from "/lib/CommonLogger";
import { LOGLEVEL, logLevelStrings } from "/lib/records/LoggerConfigurationRecord";
import { expect } from "chai";

class TestCommonLogger extends CommonLogger {
    public writeToLogCalled: boolean = false;

    constructor(l: LOGLEVEL) {
        super("testcommonlogger", Meteor.isClient ? "client" : "server");
        this.logLevelChanged(l);
    }

    protected writeTolog(level: LOGLEVEL, message: string, data?: unknown, userid?: string): void {
        this.writeToLogCalled = true;
    }
}

describe("CommonLogger", function() {
    describe("logLevelChanged", function() {it("needs to be tested", function() {assert.fail("do me");});});
    describe("various log calls", function() {
        logLevelStrings.forEach((loggerlevel) => {
            logLevelStrings.forEach((requestedlevel) => {
                const ll = CommonLogger.loglevelValue(loggerlevel as LOGLEVEL);
                const rl = CommonLogger.loglevelValue(requestedlevel as LOGLEVEL);
                if (rl <= ll) {
                    it(`should ${rl <= ll ? "" : "not "}write a log entry when log level is ${loggerlevel} and requested level is ${requestedlevel}`, function() {
                        const logger = new TestCommonLogger(loggerlevel as LOGLEVEL);
                        let messageMethodCalled = false;
                        logger[requestedlevel].call(logger, () => {messageMethodCalled = true; return "message";});
                        expect(logger.writeToLogCalled).to.equal(rl <= ll);
                        expect(messageMethodCalled).to.equal(rl <= ll);
                    });
                } else {
                    it(`should not write a log entry when log level is ${loggerlevel} and requested level is ${requestedlevel}`, function() {

                    });
                }
            });
        });
    });
});
//    private log(level: LOGLEVEL, message: () => string, data?: unknown, userid?: string) {
//         if (!this.writable(level)) return;
//         this.writeTolog(level, message(), data, userid);
//     }
//
//     protected abstract writeTolog(
//         level: LOGLEVEL,
//         message: string,
//         data?: unknown,
//         userid?: string
//     ): void;
//
//     protected logLevelChanged(newloglevel: LOGLEVEL) {
//         this.identlevel = newloglevel;
//     }
//
//     public fatal(message: () => string, data?: unknown, userid?: string): void {
//         this.log("fatal", message, data, userid);
//     }
//
//     public error(message: () => string, data?: unknown, userid?: string): void {
//         this.log("error", message, data, userid);
//     }
//
//     public warn(message: () => string, data?: unknown, userid?: string): void {
//         this.log("warn", message, data, userid);
//     }
//
//     public info(message: () => string, data?: unknown, userid?: string): void {
//         this.log("info", message, data, userid);
//     }
//
//     public debug(message: () => string, data?: unknown, userid?: string): void {
//         this.log("debug", message, data, userid);
//     }
//
//     public trace(message: () => string, data?: unknown, userid?: string): void {
//         this.log("trace", message, data, userid);
//     }
