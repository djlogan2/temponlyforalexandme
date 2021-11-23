import SimpleSchema from 'simpl-schema';
import { LogLevelEnum } from '../commonlogger';

export interface LogRecord {
    _id: string;
    date: Date;
    msg: string;
}

export const LogRecordSchema = new SimpleSchema({
  date: Date,
  msg: String,
});

export interface LogConfigRecord {
    _id: string;
    level: LogLevelEnum;
    source: string;
}

export const LogConfigRecordSchema = new SimpleSchema({
  level: Number,
  source: String,
});
