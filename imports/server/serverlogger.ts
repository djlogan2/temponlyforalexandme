import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
// import slackNotifiy from 'slack-notify';
import * as fs from 'fs';
import ServerICCServer from './servericcserver';
import CommonLogger, { LoggerType, LogLevelEnum, loglevelStrings } from '../commonlogger';
// @ts-ignore

declare const ICCServer: ServerICCServer;
// const slackNotifier = slackNotifiy(process.env.SLACK_CHANNEL_LINK);
const loggers: any = {};

function formatDate(date: Date): string {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

// function sendLog(message: string, date: Date) {
//   if (process.env.NODE_ENV !== 'development') {
//     slackNotifier.send({
//       channel: process.env.SLACK_CHANNEL_NAME,
//       text: `${date} ${message}`,
//       username: 'Notifications bot',
//     });
//   }
// }

//
// Used with the old system...not sure yet if it's going to be used in the new architecture
//
// function sendMeteorError(
//   message: string,
//   reason: string,
//   message_identifier: string,
//   userId: string,
// ) {
//   if (process.env.NODE_ENV !== 'development') {
//     slackNotifier.send({
//       channel: process.env.SLACK_CHANNEL_NAME,
//       text: `Message: ${message} \nReason: ${reason} \nMessage identifier: ${message_identifier}\nUser id: ${userId}`,
//       username: 'Notifications bot',
//     });
//   }
// }

const internalWriteTolog = Meteor.bindEnvironment(
  (
    identifier: string,
    type: LoggerType,
    level: LogLevelEnum,
    message: string,
    data?: unknown,
    userid?: string,
  ): void => {
    Meteor.defer(() => {
      const cache: any = [];
      const duplicateChecker = (key: string, value: any) => {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
            try {
              return JSON.parse(JSON.stringify(value));
            } catch (error) {
              return;
            }
          }
          cache.push(value);
        }
        return value;
      };

      const now = new Date();
      let msg = `[${type}]${now.toString()} [${loglevelStrings[level]}] ${identifier}`;

      if (userid) msg += ` [${userid}]`;

      msg += ` ${message}`;

      if (data) {
        try {
          msg += `: data=${JSON.stringify(data, duplicateChecker)}`;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }

      // if (level <= 1) {
      //   sendLog(msg, now);
      // }

      ICCServer.collections.logs.insert({ date: now, msg });

      if (Meteor.absoluteUrl() === 'http://localhost:3000/' && !Meteor.isTest && !Meteor.isAppTest) {
        console.log(msg);
      }

      msg += '\n';
      fs.appendFile(`${formatDate(now)}`, msg, () => {
      /* nop */
      });
    });
  },
);

export default class ServerLogger extends CommonLogger {
  constructor(identifier: string) {
    super(identifier, LoggerType.SERVER);
  }

  protected writeTolog(
    level: LogLevelEnum,
    message: string,
    data?: unknown,
    userid?: string,
  ): void {
    internalWriteTolog(this.identifier, this.type, level, message, data, userid);
  }
}

function addLoggers(map: any): void {
  for (const k in map) {
    if (map.hasOwnProperty(k) && !LogLevelEnum[map[k]]) throw new Error(`Level must be a valid level for ${k}`);
  }
  for (const k in map) {
    if (map.hasOwnProperty(k)) {
      const lvl = loglevelStrings.indexOf(map[k].toUpperCase()) as LogLevelEnum;
      loggers[k] = lvl;
      ICCServer.collections.loggerconfig.upsert({ source: k }, { $set: { level: lvl } });
    }
  }
}

Meteor.startup(() => {
  Meteor.methods({
    Logger__writeToLog(
      identifier: string,
      level: string,
      message: string,
      data?: string,
    ) {
      check(identifier, String);
      check(level, Number);
      check(message, Match.Any); // Errors coming in from the client can be objects!
      check(data, Match.Any);

      const loglevel: LogLevelEnum = loggers[identifier] || loggers.root || LogLevelEnum.DEBUG;

      if (level <= loglevel) {
        // @ts-ignore
        internalWriteTolog(identifier, 'CLIENT', level, message, data, this.userId);
      }
    },
  });

  // eslint-disable-next-line no-undef
  ICCServer.createLogger = (identifier) => new ServerLogger(identifier);
  const json = Assets.getText('logger_configuration.json');
  if (json) {
    const parsed = JSON.parse(json);
    if (!('root' in parsed)) {
      ICCServer.collections.loggerconfig.upsert(
        { source: 'root' },
        { $set: { level: loggers.root } },
      );
    }
    addLoggers(parsed);
  }
  ICCServer.collections.loggerconfig.find().observe({
    changed(newdoc) {
      loggers[newdoc.source] = newdoc.level;
    },
  });
});
